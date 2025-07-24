import type { CategoryType } from "../constants/items";

export interface CouponCampaign {
    title: string;
    value: number;
    campaignType: 'coupon';
    type: 'percent' | 'amount';
}

export interface OnTopCampaign {
    title: string;
    campaignType: 'on-top';
    type: 'categories' | 'points';
    discountCategory?: CategoryType | undefined;
    value: number;
}

export interface SeasonalCampaign {
    title: string;
    every: number;
    discount: number;
    campaignType: 'seasonal';
}


