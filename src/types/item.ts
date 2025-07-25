import type { CategoryType } from "../constants/items";

export interface Item {
    name: string;
    category: CategoryType;
    price: number;
    amount?: number;
    imagePath?: string;
}