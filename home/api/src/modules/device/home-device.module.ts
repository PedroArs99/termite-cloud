import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HomeDevicesMqttController } from './adapters/mqtt/MqttDevices.controller';
import { DeviceServiceImpl } from './adapters/mqtt/home-devices-mqtt.service';
import { InMemoryDeviceRepository } from './adapters/persistence/InMemoryDeviceRepository.service';
import { HomeDevicesRestController } from './adapters/rest/home-devices-rest.controller';
import { DeviceWebSocketsGateway } from './adapters/webSockets/device-wev-sockets.gateway';
import { RegisterDevicesHandler } from './application/commands/registerDevice.command';
import { UpdateDeviceStateHandler } from './application/commands/updateState.command';
import { GetAllDevicesHandler } from './application/queries/GetAllDevices.handler';

const handlers = [
  GetAllDevicesHandler,
  RegisterDevicesHandler,
  UpdateDeviceStateHandler,
];
@Module({
  controllers: [HomeDevicesMqttController, HomeDevicesRestController],
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
    DeviceWebSocketsGateway
  ],
})
export class HomeDeviceModule {}
