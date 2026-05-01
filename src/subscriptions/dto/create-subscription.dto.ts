import { IsString, IsInt, IsNumber, IsPositive, IsOptional, IsIn } from 'class-validator';

export class CreateSubscriptionDto {

    @IsString()
    name: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsString()
    currency: string;

    @IsString()
    @IsOptional()
    @IsIn(['monthly', 'yearly'], {message: 'billingCycle must be either "monthly" or "yearly"'})
    billingCycle: 'monthly' | 'yearly';
}
