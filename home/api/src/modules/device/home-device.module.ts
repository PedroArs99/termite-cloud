import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HomeDevicesMqttController } from './adapters/mqtt/home-devices-mqtt.controller';
import { DeviceServiceImpl } from './adapters/mqtt/home-devices-mqtt.service';
import { InMemoryDeviceRepository } from './adapters/persistence/InMemoryDeviceRepository.service';
import { HomeDevicesRestController } from './adapters/rest/home-devices-rest.controller';
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
      useClass: InMemoryDeviceRepository,
    },
    {
      provide: 'DeviceService',
      useClass: DeviceServiceImpl,
    },
  ],
})
export class HomeDeviceModule {}
