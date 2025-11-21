export interface InitializeParams {
  email: string;
  amount: number; // amount in kobo
  callback_url: string;
  metadata?: Record<string, any>;
}

export interface PaystackInitResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export async function paystackInitialize(params: InitializeParams): Promise<PaystackInitResponse> {
  const res = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const json = await res.json();
  if (!res.ok || !json.status) {
    throw new Error(json.message ?? 'Paystack initialize failed');
  }
  return json.data as PaystackInitResponse;
}

export interface PaystackVerifyData {
  status: string; // 'success' | 'failed' | ...
  amount: number; // kobo
  currency: string; // 'NGN'
  reference: string;
  metadata?: Record<string, any>;
}

export async function paystackVerify(reference: string): Promise<PaystackVerifyData> {
  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
    cache: 'no-store',
  });
  const json = await res.json();
  if (!res.ok || !json.status) {
    throw new Error(json.message ?? 'Paystack verify failed');
  }
  return json.data as PaystackVerifyData;
}
