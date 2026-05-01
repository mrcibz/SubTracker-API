import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
      console.log(error); 
      throw new InternalServerErrorException(
        'DB error, could not create subscription.'
      );
    } 
  }

  async findAll() {
    
  }

  async findOne(id: number) {
    try {
      const subscription = await this.prisma.subscription.findUnique({
        where: { id }
      });
      
      if (!subscription) {
        throw new NotFoundException(`Subscription with ID ${id} not found.`);
      }
      return subscription
    } catch (error) {
      if(error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'DB error, could not retrieve subscription.'
      );
    }
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    try {
      const updatedSubscription = await this.prisma.subscription.update({
        where: { id },
        data: updateSubscriptionDto
      });
      return {
        message: 'Subscription updated successfully',
        subscription: updatedSubscription
      };
    } catch (error) {
      if(error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'DB error, could not update subscription.'
      );
    }
  }

  async remove(id: number) {
    try {
      const deletedSubscription = await this.prisma.subscription.delete({
        where: { id }
      });
      if (!deletedSubscription) {
        throw new NotFoundException(`Subscription with ID ${id} not found.`);
      }
      return {
        message: 'Subscription deleted successfully',
        subscription: deletedSubscription
      };
    } catch (error) {
      if(error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException("DB error, could not delete subscription.");
      }
    }
  }
}
