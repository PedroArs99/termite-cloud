import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HomeDevicesMqttController } from './adapters/mqtt/home-devices-mqtt.controller';
import { DeviceServiceImpl } from './adapters/mqtt/home-devices-mqtt.service';
import { S3DeviceRepository } from './adapters/persistence/S3DeviceRepository.service';
import { HomeDevicesRestController } from './adapters/rest/home-devices-rest.controller';
import { DeviceWebSocketsGateway } from './adapters/webSockets/device-wev-sockets.gateway';
import { RegisterDevicesHandler } from './application/commands/register/register-devices.handler';
import { UpdateDeviceStateHandler } from './application/commands/updateState/updateState.handler';
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
      useClass: S3DeviceRepository,
    },
    {
      provide: 'DeviceService',
      useClass: DeviceServiceImpl,
    },
    DeviceWebSocketsGateway
  ],
})
export class HomeDeviceModule {}
