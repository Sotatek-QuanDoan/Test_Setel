import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/nestdb';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_URI),
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
