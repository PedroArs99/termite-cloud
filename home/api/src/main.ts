import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Init App context
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });
  
  // Inject Env
  const configService = app.get<ConfigService>(ConfigService);
  const envs = {
    mqtt_url: configService.get("MQTT_URL"),
  }

  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: envs.mqtt_url,
    },
  });

  app.startAllMicroservices();
  app.setGlobalPrefix('api');

  const logger = new Logger("main.ts");
  logger.log(`S3_ACCESS_KEY: ${configService.get("S3_ACCESS_KEY")}`)

  await app.listen(3000);
}

bootstrap();
