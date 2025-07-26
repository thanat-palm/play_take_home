import type { CategoryType } from "../constants/items";

export interface DiscountSetProps {
    coupon: CouponCampaign[],
    ontop: OnTopSetting,
    seasonal: SeasonalSetting,
}

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

export interface OnTopSetting {
    status: boolean;
    category: CategoryType;
    value: number;
}

export interface SeasonalCampaign extends BaseCampaign {
    campaignType: 'seasonal';
    every: number;
    discount: number;
}

export interface SeasonalSetting {
    status: boolean;
    every: number;
    discount: number;
}

export type Campaign = CouponCampaign | OnTopCampaign | SeasonalCampaign;

export interface DiscountResult {
    coupon: number | null;
    onTop: number | null;
    seasonal: number | null;
    summaryPrice: number | null;
    totalResult: number | null;
}