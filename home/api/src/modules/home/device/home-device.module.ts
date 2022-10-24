import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { HomeDevicesMqttController } from "./adapters/mqtt/home-devices-mqtt.controller";
import { InMemoryDeviceRepository } from "./adapters/persistence/InMemoryDeviceRepository.service";

@Module({
    controllers: [
        HomeDevicesMqttController
    ],
    imports: [
        CqrsModule
    ],
    providers: [
        {
            provide: 'DeviceRepository',
            useClass: InMemoryDeviceRepository
        }
    ]
})
export class HomeDeviceModule {}