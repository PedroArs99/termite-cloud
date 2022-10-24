import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { HomeDevicesMqttController } from "./adapters/mqtt/home-devices-mqtt.controller";
import { InMemoryDeviceRepository } from "./adapters/persistence/InMemoryDeviceRepository.service";
import { HomeDevicesRestController } from "./adapters/rest/home-devices-rest.controller";
import { UpsertDevicesHandler } from "./application/commands/upsert-devices.handler";
import { GetAllDevicesHandler } from "./application/queries/GetAllDevices.handler";

const handlers = [
    GetAllDevicesHandler,
    UpsertDevicesHandler
]
@Module({
    controllers: [
        HomeDevicesMqttController,
        HomeDevicesRestController,
    ],
    imports: [
        CqrsModule
    ],
    providers: [
        ...handlers,
        {
            provide: 'DeviceRepository',
            useClass: InMemoryDeviceRepository
        }
    ]
})
export class HomeDeviceModule {}