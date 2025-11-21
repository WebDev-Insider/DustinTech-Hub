import {z} from 'zod'

export const productschema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.enum(["draft", "published", "archived"]),
    price: z.number().min(1),
    images: z.array(z.string()).min(1, "At least one image is required"),
    category: z.enum(["hp", "dell", "acer", "lenovo", "msi", "chromebook", "apple", "asus", "mobile"]),
    isFeatured: z.boolean().optional(),
});


export const bannerSchema = z.object({
    title: z.string(),
    imageString: z.string(),
});

export const shippingSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    address1: z.string().min(3),
    address2: z.string().optional().nullable(),
    city: z.string().min(2),
    state: z.string().min(2),
    postalCode: z.string().min(2),
    country: z.string().min(2),
});