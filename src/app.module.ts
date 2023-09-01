import { Module } from '@nestjs/common';
import { RmqModule } from 'future-connectors';
import { NotificationModule } from './notifier/notification.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    RmqModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
