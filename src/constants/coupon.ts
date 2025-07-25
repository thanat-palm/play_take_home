import type { CouponCampaign } from "../types/campaign";

export const defaultCouponForm:CouponCampaign = {
    title: '',
    campaignType: 'coupon',
    type: 'amount',
    value: 0
}

export const defaultCouponLists:CouponCampaign[] = [
    {
        title: 'โค้ดโคตรคุ้ม เอาใจสายเปย์',
        value: 40,
        campaignType: 'coupon',
        type: 'percent'
    },
    {
        title: 'โค้ดโคตรคุ้ม',
        value: 20,
        campaignType: 'coupon',
        type: 'percent'
    },
    {
        title: 'โค้ดสุดคุ้ม',
        value: 10,
        campaignType: 'coupon',
        type: 'percent'
    },
    {
        title: 'โค้ดลดตรงๆ ลดทันที ',
        value: 25,
        campaignType: 'coupon',
        type: 'amount'
    },{
        title: 'โค้ดลดสุดๆ ลดทันที',
        value: 50,
        campaignType: 'coupon',
        type: 'amount'
    }
]