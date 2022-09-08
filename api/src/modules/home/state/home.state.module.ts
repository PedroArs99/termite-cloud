import { Module } from "@nestjs/common";
import { HomeStateMqttController } from "./adapters/home.state.mqtt.controller";

@Module({
    controllers: [
        HomeStateMqttController
    ]
})
export class HomeStateModule{}