'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navbarLinks, moreItems } from './nav-data';

export function Navbarlinks() {
  const location = usePathname();
  const isMoreActive = moreItems.some((i) => i.href === location);
  return (
    <div className="hidden md:flex justify-center items-center gap-x-2 ml-8">
      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            location === item.href
              ? 'bg-muted'
              : 'hover:bg-muted hover:bg-opacity-75',
            'group p-2 font-medium rounded-md'
          )}
        >
          {item.name}
        </Link>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            isMoreActive ? 'bg-muted' : 'hover:bg-muted hover:bg-opacity-75',
            'p-2 font-medium rounded-md'
          )}
        >
          More
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {moreItems.map((item) => (
            <DropdownMenuItem asChild key={item.href}>
              <Link href={item.href}>{item.name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
