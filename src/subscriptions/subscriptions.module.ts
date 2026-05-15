import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, PrismaService],
  imports: [AuthModule]
})
export class SubscriptionsModule {}
