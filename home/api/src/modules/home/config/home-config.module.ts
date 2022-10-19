import { Module } from '@nestjs/common';
import { HomeConfigMqttController } from './adapters/mqtt/HomeConfigMqtt.adapter';
import { HomeConfigRestController } from './adapters/rest/home-config-rest.controller';

@Module({
  controllers: [
    HomeConfigMqttController,
    HomeConfigRestController
  ]
})
export class HomeConfigModule {}
