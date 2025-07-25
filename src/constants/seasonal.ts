import type { SeasonalCampaign, SeasonalSetting } from "../types/campaign";

export const defaultSeasonalForm:SeasonalSetting = {
    status: true,
    every: 0,
    discount: 0,
}

export const defaultSeasonalDiscountForm:SeasonalCampaign = {
    title: 'โปร 8.8',
    campaignType: 'seasonal',
    every: 800,
    discount: 80,
};