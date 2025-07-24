import type { CouponCampaign, OnTopCampaign } from "../types/campaign";
import type { Item } from "../types/item";

export const Sum = (list:Item[]) => {  
    let num = 0;
    list.forEach( l => {
        if(!l.amount)return null;
        num += l.amount*l.price;
    }); 
    return num;
}

export const CouponCalculator = (price:number , coupon:CouponCampaign) => {
    if(!price || !coupon) return null;
    const {type , value} = coupon;
    if(type === 'amount') return price - value;
    return price - (price*value)/100;
}

export const onTopCalculator = (basket:Item[] , onTop:OnTopCampaign) => {
    if(!basket || !onTop) return null;
    const {type , value , discountCategory} = onTop;
    if(type === 'categories' && discountCategory) {
        if(!discountCategory) return null;
        const totalCatValue =  Sum(basket.filter((b => b.category === discountCategory)));
        const discountedCatValue = totalCatValue - (totalCatValue*value)/100;
        return discountedCatValue + Sum(basket.filter((b => b.category !== discountCategory)));
    }
    const basketSummary = Sum(basket);
    const maxDiscountPercentage = 20;
    const maxDiscount = basketSummary*(maxDiscountPercentage/100);
    if(value > maxDiscount) return basketSummary - maxDiscount;
    return basketSummary - value;
    
}

export const seasonalCalculator = (price:number ,every:number , discount:number) => {
    if(!price || !every || !discount) return null;
    if(every <= 0) return price;

    let discountUnits = Math.floor(price / every);

    if(discountUnits < 1) return price;
    
    return price - (discount*discountUnits);
}