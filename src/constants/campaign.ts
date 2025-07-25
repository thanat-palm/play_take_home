
export const campaignTypes = [
    'coupon',
    'on-top',
    'seasonal',
] as const

export type CampaignsType = typeof campaignTypes[number];
