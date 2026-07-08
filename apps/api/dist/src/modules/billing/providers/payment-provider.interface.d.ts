export interface PaymentProvider {
    createPayment(amount: number, currency: string, metadata: any): Promise<any>;
    verifyPayment(transactionId: string): Promise<boolean>;
    refund(transactionId: string, amount?: number): Promise<any>;
}
