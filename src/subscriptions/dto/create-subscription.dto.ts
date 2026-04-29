export class CreateSubscriptionDto {
    name: string;
    price: number;
    currency: string;
    billingCycle: 'monthly' | 'yearly';
}
