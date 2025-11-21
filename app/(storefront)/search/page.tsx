import prisma from '@/app/lib/db';
import { unstable_noStore as noStore } from 'next/cache';
import { ProductCard } from '@/app/components/storefront/ProductCard';

function mapQueryToCategory(q: string): string | null {
  const s = q.toLowerCase();
  const synonyms: Record<string, string> = {
    'apple': 'apple',
    'apple store': 'apple',
    'dell': 'dell',
    'hp': 'hp',
    'hewlett packard': 'hp',
    'lenovo': 'lenovo',
    'msi': 'msi',
    'chromebook': 'chromebook',
    'asus': 'asus',
    'mobile': 'mobile',
    'mobile phone': 'mobile',
    'mobile phones': 'mobile',
    'phone': 'mobile',
    'phones': 'mobile',
  };
  return synonyms[s] ?? null;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  noStore();
  const q = (searchParams?.q ?? '').trim();

  const cat = q ? mapQueryToCategory(q) : null;

  const where = q
    ? {
        status: 'published' as const,
        OR: [
          { name: { contains: q, mode: 'insensitive' as const } },
          { description: { contains: q, mode: 'insensitive' as const } },
          ...(cat ? [{ category: cat as any }] : []),
        ],
      }
    : { status: 'published' as const };

  const results = await prisma.product.findMany({
    where,
    select: { id: true, name: true, description: true, images: true, price: true },
    orderBy: { createdAt: 'desc' },
    take: q ? 24 : 12,
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 my-6">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">Search results{q ? ` for "${q}"` : ''}</h1>
        <p className="text-sm text-muted-foreground mt-1">{results.length} item{results.length === 1 ? '' : 's'}</p>
      </div>

      {results.length === 0 ? (
        <div className="text-muted-foreground">No products found. Try a different search.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
