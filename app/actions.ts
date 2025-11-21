'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { bannerSchema, productschema, shippingSchema } from './lib/zodSchemas';
import prisma from './lib/db';
import { revalidatePath } from 'next/cache';
import { paystackInitialize } from './lib/paystack';

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'henrydustin95@gmail.com') {
    return redirect('/');
  }



  const submission = parseWithZod(formData, {
    schema: productschema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlstring) =>
    urlstring.split(',').map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect('/dashboard/products');
}

export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'henrydustin95@gmail.com') {
    return redirect('/');
  }

  const submission = parseWithZod(formData, {
    schema: productschema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }
  const flattenUrls = submission.value.images.flatMap((urlstring) =>
    urlstring.split(',').map((url) => url.trim())
  );

  const productId = formData.get('productId') as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      category: submission.value.category,
      price: submission.value.price,
      isFeatured: submission.value.isFeatured === true ? true : false,
      status: submission.value.status,
      images: flattenUrls,
    },
  });

  redirect('/dashboard/products');
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'henrydustin95@gmail.com') {
    return redirect('/');
  }

  await prisma.product.delete({
    where: {
      id: formData.get('productId') as string,
    },
  });

  redirect('/dashboard/products');
}

export async function createBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'henrydustin95@gmail.com') {
    return redirect('/');
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect('/dashboard/banner');
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'henrydustin95@gmail.com') {
    return redirect('/');
  }

  await prisma.banner.delete({
    where: {
      id: formData.get('bannerId') as string,
    },
  });

  redirect('/dashboard/banner');
}

export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  // Ensure the product exists
  const selectedProduct = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true },
  });
  if (!selectedProduct) {
    throw new Error('No product with this id');
  }

  // Ensure DB user exists to satisfy Cart FK (id, names, email, profileImage)
  await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: {
      id: user.id,
      firstName: (user.given_name as string) ?? '',
      lastName: (user.family_name as string) ?? '',
      email: (user.email as string) ?? '',
      profileImage:
        (user.picture as string) ?? `https://avatar.vercel.sh/${user.given_name}`,
    },
  });

  // Find or create cart for user (use upsert on unique userId)
  const cart = await prisma.cart.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id },
  });

  // Upsert cart item (increment quantity if exists)
  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
    select: { id: true, quantity: true },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity: 1 },
    });
  }

  revalidatePath('/', 'layout');
}

export async function delItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const productId = formData.get('productId') as string;

  const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
  if (cart) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });
  }

  revalidatePath('/bag');
}

export async function checkOut() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const cart = await prisma.cart.findFirst({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: { select: { name: true, price: true } },
        },
      },
    },
  });

  if (cart && cart.items && cart.items.length > 0) {
    const totalAmountNaira = cart.items.reduce(
      (
        sum: number,
        item: { product: { price: number }; quantity: number }
      ) => sum + item.product.price * item.quantity,
      0
    );
    const amountInKobo = totalAmountNaira * 100;

    const callbackUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/payment/success'
        : 'https://dustin-tech-hub.vercel.app/payment/success';

    const init = await paystackInitialize({
      email: (user.email as string) ?? 'customer@example.com',
      amount: amountInKobo,
      callback_url: callbackUrl,
      metadata: { userId: user.id },
    });

    return redirect(init.authorization_url);
  }
}

export async function initiateCheckout(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const submission = parseWithZod(formData, { schema: shippingSchema });
  if (submission.status !== 'success') {
    return submission.reply();
  }

  const cart = await prisma.cart.findFirst({
    where: { userId: user.id },
    include: {
      items: { include: { product: { select: { name: true, price: true } } } },
    },
  });

  if (!cart || !cart.items || cart.items.length === 0) {
    return redirect('/bag');
  }

  const totalAmountNaira = cart.items.reduce(
    (
      sum: number,
      item: { product: { price: number }; quantity: number }
    ) => sum + item.product.price * item.quantity,
    0
  );
  const amountInKobo = totalAmountNaira * 100;

  const callbackUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/payment/success'
      : 'https://dustin-tech-hub.vercel.app/payment/success';

  const s = submission.value as {
    fullName: string;
    email: string;
    phone: string;
    address1: string;
    address2?: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  const init = await paystackInitialize({
    email: s.email,
    amount: amountInKobo,
    callback_url: callbackUrl,
    metadata: {
      userId: user.id,
      fullName: s.fullName,
      email: s.email,
      phone: s.phone,
      address1: s.address1,
      address2: s.address2 ?? '',
      city: s.city,
      state: s.state,
      postalCode: s.postalCode,
      country: s.country,
    },
  });

  return redirect(init.authorization_url);
}
