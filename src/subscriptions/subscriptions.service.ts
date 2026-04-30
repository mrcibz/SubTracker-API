import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from '../prisma.service';


@Injectable()
export class SubscriptionsService {

  constructor(private prisma: PrismaService) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) { 
    try  {
      const subscription = await this.prisma.subscription.create({
        data: createSubscriptionDto
      })
      return subscription;
  } catch (error) {
      throw new InternalServerErrorException(
        'Error de base de datos al intentar crear la suscripción.'
      );
    } 
  }

  async findAll() {
    
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
