'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Orders',
    href: '/dashboard/orders',
  },
  {
    name: 'Products',
    href: '/dashboard/products',
  },
  {
    name: 'Banner Picture',
    href: '/dashboard/banner',
  },
];

export function DashboardNavigation() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={cn(
            link.href === pathname
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {link.name}
        </a>
      ))}
    </>
  );
}
