import type { CategoryType } from "../constants/items";

export interface BaseCampaign {
    title: string;
}

export interface CouponCampaign extends BaseCampaign {
    campaignType: 'coupon';
    value: number;
    type: 'percent' | 'amount';
}

export interface OnTopCampaign extends BaseCampaign {
    campaignType: 'on-top';
    type: 'categories' | 'points';
    discountCategory?: CategoryType | undefined;
    value: number;
}

export interface SeasonalCampaign extends BaseCampaign {
    campaignType: 'seasonal';
    every: number;
    discount: number;
}

export type Campaign = CouponCampaign | OnTopCampaign | SeasonalCampaign;
