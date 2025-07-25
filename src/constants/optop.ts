import type { OnTopCampaign, OnTopSetting } from "../types/campaign";

export const defaultOnTopForm:OnTopSetting = {
    status: true,
    category: 'accessories',
    value: 0,
}

export const defaultOnTopDiscountForm:OnTopCampaign = {
    title: 'ลดแรง',
    campaignType: 'on-top',
    type: 'categories',
    value: 10,
    discountCategory: 'electronics',
};