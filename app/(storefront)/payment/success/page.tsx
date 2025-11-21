import prisma from '@/app/lib/db';
import { paystackVerify } from '@/app/lib/paystack';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { unstable_noStore as noStore } from 'next/cache';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default async function SuccessRoute({
  searchParams,
}: {
  searchParams: { reference?: string };
}) {
  noStore();

  const reference = searchParams?.reference;
  let amountKobo = 0;
  let verified = false;

  if (reference) {
    try {
      const data = await paystackVerify(reference);
      verified = data.status?.toLowerCase() === 'success';
      amountKobo = data.amount ?? 0;

      const meta = (data.metadata as any) ?? {};
      const userId = (meta.userId as string) ?? undefined;

      // Upsert order by reference and attach user if present
      await prisma.order.upsert({
        where: { reference },
        update: {
          status: verified ? 'success' : 'failed',
          amount: amountKobo,
          ...(userId ? { userId } : {}),
          fullName: meta.fullName ?? null,
          email: meta.email ?? null,
          phone: meta.phone ?? null,
          address1: meta.address1 ?? null,
          address2: meta.address2 ?? null,
          city: meta.city ?? null,
          state: meta.state ?? null,
          postalCode: meta.postalCode ?? null,
          country: meta.country ?? null,
        },
        create: {
          reference,
          status: verified ? 'success' : 'failed',
          amount: amountKobo,
          ...(userId ? { userId } : {}),
          fullName: meta.fullName ?? null,
          email: meta.email ?? null,
          phone: meta.phone ?? null,
          address1: meta.address1 ?? null,
          address2: meta.address2 ?? null,
          city: meta.city ?? null,
          state: meta.state ?? null,
          postalCode: meta.postalCode ?? null,
          country: meta.country ?? null,
        },
      });

      // Clear cart items for the user if we have userId
      if (userId) {
        const cart = await prisma.cart.findFirst({ where: { userId } });
        if (cart) {
          await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        }
      }
    } catch (e) {
      // swallow error and show generic success UI
    }
  }

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              {verified ? 'Payment Successful' : 'Payment Processed'}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {verified
                ? `You paid ₦${new Intl.NumberFormat('en-NG').format(
                    Math.floor(amountKobo / 100)
                  )}.`
                : 'If your payment was successful, your order will appear in your dashboard shortly.'}
            </p>
            <Button asChild className="w-full mt-5 sm:mt-6">
              <Link href="/">Back to Homepage</Link>
            </Button>
            <Button asChild className="w-full mt-5 sm:mt-6">
              <Link href="https://dustin-tech-hub-contact-form.netlify.app/">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
