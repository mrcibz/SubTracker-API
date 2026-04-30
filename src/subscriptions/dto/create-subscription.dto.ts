import { IsString, IsInt, IsNumber, IsPositive, IsOptional } from 'class-validator';

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
    billingCycle: 'monthly' | 'yearly';
}
