import type { CouponCampaign } from "../types/campaign";

export const campaignTypes = [
    'coupon',
    'on-top',
    'seasonal',
] as const

export type CampaignsType = typeof campaignTypes[number];

export const couponslist:CouponCampaign[] = [

]