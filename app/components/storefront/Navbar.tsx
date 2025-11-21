import Link from 'next/link';
import { Navbarlinks } from './NavbarLinks';
import { navbarLinks, moreItems } from './nav-data';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ShoppingBagIcon, Laptop, MenuIcon } from 'lucide-react';
import { UserDropdown } from './UserDropdown';
import { Button } from '@/components/ui/button';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import prisma from '@/app/lib/db';
import { ThemeToggle } from '@/app/components/theme/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let total = 0;
  if (user) {
    const cart = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: { items: { select: { quantity: true } } },
    });
    const items = cart?.items ?? [];
    total = items.reduce(
      (sum: number, item: { quantity: number }) => sum + item.quantity,
      0
    );
  }

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="mr-2 md:hidden" variant="outline" size="icon">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-3 text-lg font-medium mt-5">
              {navbarLinks.map((item) => (
                <Link key={item.id} href={item.href} className="px-2 py-1 rounded-md hover:bg-muted">
                  {item.name}
                </Link>
              ))}
              <div className="mt-2 text-sm text-muted-foreground">More</div>
              {moreItems.map((item) => (
                <Link key={item.href} href={item.href} className="px-2 py-1 rounded-md hover:bg-muted">
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/">
          <div className="flex items-center gap-2">
            <Laptop className="h-6 w-6 text-primary" />
            <h1 className="text-foreground font-bold text-xl lg:text-3xl">
              DustinTech<span className="text-primary"> Hub</span>
            </h1>
          </div>
        </Link>
        <Navbarlinks />
      </div>

      <div className="flex items-center">
        <ThemeToggle />
        {user ? (
          <>
            <Link href="/bag" className="group p-2 flex items-center mr-2">
              <ShoppingBagIcon className="h-6 w-6 text-muted-foreground group-hover:text-foreground" />
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                {total}
              </span>
            </Link>

            <UserDropdown
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant="ghost" asChild>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <span className="h-6 w-px bg-border"></span>
            <Button variant="ghost" asChild>
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
