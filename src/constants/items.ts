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
        imagePath: '/images/bag.png'
    },
    {
        name: 'T-Shirt',
        category: 'apparel',
        price: 700,
        imagePath: '/images/t-shirt.png'
    },
    {
        name: 'Laptop',
        category: 'electronics',
        price: 24000,
        imagePath: '/images/laptop.png' 
    },
    {
        name: 'iPhone',
        category: 'electronics',
        price: 18900,
        imagePath: '/images/iphone.png' 
    },
    {
        name: 'Pant',
        category: 'apparel',
        price: 800,
        imagePath: '/images/pant.png' 
    },
];