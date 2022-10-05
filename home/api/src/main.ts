import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Init App context
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });
  
  // Inject Env
  const configService = app.get<ConfigService>(ConfigService);
  const envs = {
    mqtt_url: configService.get("MQTT_URL"),
    mqtt_username: configService.get("MQTT_USERNAME"),
    mqtt_password: configService.get("MQTT_PASSWORD"),
  }

  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: envs.mqtt_url,
      username: envs.mqtt_username,
      password: envs.mqtt_password,
    },
  });

  app.startAllMicroservices();
  app.setGlobalPrefix('api');

  await app.listen(3000);
}

bootstrap();
