export declare class CreateSubscriptionDto {
    planId: string;
    couponCode?: string;
}
export declare class UpdateSubscriptionDto {
    planId: string;
}
export declare class CreatePaymentDto {
    invoiceId: string;
    provider: string;
}
export declare class CreateCouponDto {
    code: string;
    discountType: string;
    discountValue: number;
    maxUses?: number;
}
