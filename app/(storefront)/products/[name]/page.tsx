import { ProductCard } from '@/app/components/storefront/ProductCard';
import prisma from '@/app/lib/db';
import { notFound } from 'next/navigation';

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
  const { data, title } = await getData(params.name);
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard item={item} />
        ))}
      </div>
    </section>
  );
}
