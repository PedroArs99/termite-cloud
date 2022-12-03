import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HomeDevicesMqttController } from './adapters/mqtt/MqttDevices.controller';
import { DeviceServiceImpl } from './adapters/mqtt/home-devices-mqtt.service';
import { InMemoryDeviceRepository } from './adapters/persistence/InMemoryDeviceRepository.service';
import { HomeDevicesRestController } from './adapters/rest/home-devices-rest.controller';
import { DevicesEventsController } from './adapters/sse/devices-events.controller';
import { RegisterDevicesHandler } from './application/commands/registerDevice.command';
import { UpdateDeviceStateHandler } from './application/commands/updateState.command';
import { GetAllDevicesHandler } from './application/queries/GetAllDevices.handler';
import { GetDevicesEventSourceHandler } from './application/queries/GetDevicesEventSource.handler';

const controllers = [
  DevicesEventsController,
  HomeDevicesMqttController,
  HomeDevicesRestController,
];

const handlers = [
  GetAllDevicesHandler,
  GetDevicesEventSourceHandler,
  RegisterDevicesHandler,
  UpdateDeviceStateHandler,
];

@Module({
  controllers: [...controllers],
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_client',
        transport: Transport.MQTT,
      },
    ]),
    CqrsModule,
  ],
  providers: [
    ...handlers,
    {
      provide: 'DeviceRepository',
      useClass: InMemoryDeviceRepository,
    },
    {
      provide: 'DeviceService',
      useClass: DeviceServiceImpl,
    },
  ],
})
export class HomeDeviceModule {}
