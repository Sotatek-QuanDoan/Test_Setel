import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums/request-method.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { OrdersModule } from './modules/orders/orders.module';
import { config } from './shared/config';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongodb.uri),
    BullModule.forRoot({
      redis: {
        host: config.redis.host,
        port: config.redis.port,
      },
    }),
    OrdersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
