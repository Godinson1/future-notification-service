import { NestFactory } from '@nestjs/core';
import { RmqService } from 'future-connectors';
import { AppModule } from './app.module';
import { NOTIFICATION } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(NOTIFICATION));
  await app.startAllMicroservices();
  await app.listen(3005);
}
bootstrap();
