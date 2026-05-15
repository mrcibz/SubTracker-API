import { Controller, Get, Post, Body, Patch, Param, Delete, Header, ParseIntPipe, BadRequestException, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Role } from '../lib/roles/role.enum'
import { Roles } from '../lib/roles/roles.decorator'
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../lib/roles/roles.guard';

@Controller('subscriptions')

export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    const subscription = await this.subscriptionsService.create(createSubscriptionDto);
    return {
      message: 'Subscription created successfully',
      subscription
    };
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({exceptionFactory: (error) => {return new BadRequestException("Invalid ID format")}})) id: number) {
    
    return this.subscriptionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe({exceptionFactory: (error) => {return new BadRequestException("Invalid ID format")}})) id: number, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionsService.update(id, updateSubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe({exceptionFactory: (error) => {return new BadRequestException("Invalid ID format")}})) id: number) {
    return this.subscriptionsService.remove(id);
  }
}
