import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SubscriptionsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService, SubscriptionsService],
})
export class AppModule {}

