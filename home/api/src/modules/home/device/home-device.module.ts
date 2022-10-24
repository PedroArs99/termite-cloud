import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { HomeDevicesMqttController } from "./adapters/mqtt/home-devices-mqtt.controller";

@Module({
    controllers: [
        HomeDevicesMqttController
    ],
    imports: [
        CqrsModule
    ]
})
export class HomeDeviceModule {}