import { delItem } from '@/app/actions';
import { DeleteItem } from '@/app/components/SubmitButtons';
import prisma from '@/app/lib/db';
import { Button } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

export default async function BagRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/');
  }

  const cart = await prisma.cart.findFirst({
    where: { userId: user.id },
    include: {
      items: { include: { product: { select: { id: true, name: true, price: true, images: true } } } },
    },
  });

  type CartItemWithProduct = {
    id: string;
    quantity: number;
    product: { id: string; name: string; price: number; images: string[] };
  };
  const items = (cart?.items ?? []) as CartItemWithProduct[];
  const totalPrice = items.reduce(
    (sum: number, item: CartItemWithProduct) =>
      sum + item.product.price * item.quantity,
    0
  );
  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
      {items.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            You dont have any Product in your Bag
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently dont have any products in your shopping bag. Please
            add some so that you can see them right here.
          </p>
          <Button asChild>
            <Link href="/">Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          {items.map((item: CartItemWithProduct) => (
            <div key={item.id} className="flex">
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                <Image
                  fill
                  className="rounded-md object-cover"
                  src={item.product.images[0]}
                  alt="product image"
                />
              </div>
              <div className="ml-5 flex justify-between w-full font-medium">
                <p>{item.product.name}</p>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>{item.quantity} x</p>
                    <p>
                      ₦{new Intl.NumberFormat('en-NG').format(item.product.price)}
                    </p>
                  </div>
                  <form action={delItem} className="text-end">
                    <input type="hidden" name="productId" value={item.product.id} />
                    <DeleteItem />
                  </form>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-10">
            <div className="flex items-center justify-between font-medium">
              <p>Subtotal:</p>
              <p>
                ₦{new Intl.NumberFormat('en-NG').format(totalPrice)}
              </p>
            </div>

            <Button asChild size="lg" className="w-full mt-5">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
