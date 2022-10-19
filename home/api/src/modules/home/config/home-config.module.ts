import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HomeConfigMqttController } from './adapters/mqtt/HomeConfigMqtt.adapter';
import { InMemoryHomeConfigRepository } from './adapters/persistence/InMemoryHomeConfig.service';
import { HomeConfigRestController } from './adapters/rest/home-config-rest.controller';
import { SetBridgeStateHandler } from './application/commands/setBridgeState/SetBridgeState.handler';

const handlers = [ SetBridgeStateHandler]

@Module({
  controllers: [
    HomeConfigMqttController,
    HomeConfigRestController
  ],
  imports: [
    CqrsModule
  ],
  providers: [
    ...handlers,
    {
      provide: "HomeConfigRepository",
      useClass: InMemoryHomeConfigRepository
    }
  ]
})
export class HomeConfigModule {}
