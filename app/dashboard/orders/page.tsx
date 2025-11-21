import prisma from '@/app/lib/db';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { unstable_noStore as noStore } from 'next/cache';

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      id: true,
      fullName: true,
      email: true,
      phone: true,
      address1: true,
      address2: true,
      city: true,
      state: true,
      postalCode: true,
      country: true,
      User: {
        select: {
          firstName: true,
          profileImage: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

export default async function OrdersPage() {
  noStore();
  const data = await getData();
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store!</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Shipping Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-medium">{item.fullName ?? item.User?.firstName}</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    {item.email ?? item.User?.email}
                  </p>
                </TableCell>
                <TableCell>{item.email ?? item.User?.email}</TableCell>
                <TableCell>{item.phone ?? '-'}</TableCell>
                <TableCell>
                  {[item.address1, item.address2, item.city, item.state, item.postalCode, item.country]
                    .filter(Boolean)
                    .join(', ')}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('en-US').format(item.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  ₦{new Intl.NumberFormat('en-NG').format(item.amount / 100)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
