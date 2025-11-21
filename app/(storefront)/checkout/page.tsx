'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { shippingSchema } from '@/app/lib/zodSchemas';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { initiateCheckout } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckoutButton } from '@/app/components/SubmitButtons';

export default function CheckoutPage() {
  const [lastResult, action] = useFormState(initiateCheckout, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: shippingSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} className="max-w-3xl mx-auto my-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <Button variant="outline" asChild>
          <Link href="/bag">Back to Bag</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 md:col-span-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              key={fields.fullName.key}
              name={fields.fullName.name}
              defaultValue={fields.fullName.initialValue}
              placeholder="e.g., John Doe"
            />
            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              key={fields.email.key}
              name={fields.email.name}
              defaultValue={fields.email.initialValue}
              placeholder="name@example.com"
            />
            <p className="text-red-500 text-sm">{fields.email.errors}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Phone</Label>
            <Input
              type="tel"
              key={fields.phone.key}
              name={fields.phone.name}
              defaultValue={fields.phone.initialValue}
              placeholder="e.g., +2348012345678"
            />
            <p className="text-red-500 text-sm">{fields.phone.errors}</p>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <Label>Street Address</Label>
            <Input
              type="text"
              key={fields.address1.key}
              name={fields.address1.name}
              defaultValue={fields.address1.initialValue}
              placeholder="123 Main Street"
            />
            <p className="text-red-500 text-sm">{fields.address1.errors}</p>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <Label>Apartment / Suite / Unit (optional)</Label>
            <Input
              type="text"
              key={fields.address2.key}
              name={fields.address2.name}
              defaultValue={fields.address2.initialValue}
              placeholder="Apt 4B"
            />
            <p className="text-red-500 text-sm">{fields.address2.errors}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Label>City</Label>
            <Input
              type="text"
              key={fields.city.key}
              name={fields.city.name}
              defaultValue={fields.city.initialValue}
            />
            <p className="text-red-500 text-sm">{fields.city.errors}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Label>State/Province</Label>
            <Input
              type="text"
              key={fields.state.key}
              name={fields.state.name}
              defaultValue={fields.state.initialValue}
            />
            <p className="text-red-500 text-sm">{fields.state.errors}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Zip/Postal Code</Label>
            <Input
              type="text"
              key={fields.postalCode.key}
              name={fields.postalCode.name}
              defaultValue={fields.postalCode.initialValue}
            />
            <p className="text-red-500 text-sm">{fields.postalCode.errors}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Country</Label>
            <Input
              type="text"
              key={fields.country.key}
              name={fields.country.name}
              defaultValue={fields.country.initialValue}
              placeholder="Nigeria"
            />
            <p className="text-red-500 text-sm">{fields.country.errors}</p>
          </div>

          <div className="md:col-span-2 mt-2">
            <CheckoutButton />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
