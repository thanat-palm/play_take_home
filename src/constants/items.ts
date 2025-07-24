import type { Item } from "../types/item";

export const categories = [
    'accessories',
    'apparel',
    'electronics',
] as const

export type CategoryType = typeof categories[number];

export const itemCatalog:Item[] = [
    {
        name: 'Bag',
        category: 'accessories',
        price: 1200,
    },
    {
        name: 'T-Shirt',
        category: 'apparel',
        price: 700,
    },
    {
        name: 'Laptop',
        category: 'electronics',
        price: 24000,
    },
    {
        name: 'iPhone',
        category: 'electronics',
        price: 18900,
    },
    {
        name: 'Pant',
        category: 'apparel',
        price: 800,
    },
];