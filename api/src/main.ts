import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });
  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://rpi:1883',
      username: 'pedroars',
      password: '5ce9ee69',
    },
  });

  app.startAllMicroservices();
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
