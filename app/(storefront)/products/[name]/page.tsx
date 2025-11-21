import { ProductCard } from '@/app/components/storefront/ProductCard';
import prisma from '@/app/lib/db';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

async function getData(productCategory: string) {
  switch (productCategory) {
    case 'all': {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          status: 'published',
        },
      });

      return {
        title: 'All Products',
        data: data,
      };
    }
    case 'hp': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'hp',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: 'Product for Hp',
        data: data,
      };
    }
    case 'dell': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'dell',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: 'product for Dell',
        data: data,
      };
    }
    case 'acer': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'acer',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: 'Product for Acer',
        data: data,
      };
    }
    case 'lenovo': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'lenovo',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: 'Products for Lenovo',
        data,
      };
    }
    case 'msi': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'msi',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: 'Products for MSI',
        data,
      };
    }
    case 'chromebook': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'chromebook',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: 'Chromebooks',
        data,
      };
    }
    case 'apple': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'apple',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: 'Apple Store',
        data,
      };
    }
    case 'asus': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'asus',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: 'Products for Asus',
        data,
      };
    }
    case 'mobile': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'mobile',
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: 'Mobile Phones',
        data,
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function categoriesPage({
  params,
}: {
  params: { name: string };
}) {
  noStore();
  const { data, title } = await getData(params.name);
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
