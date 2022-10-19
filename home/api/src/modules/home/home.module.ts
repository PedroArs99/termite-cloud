import { Module } from "@nestjs/common";
import { HomeConfigModule } from "./config/home-config.module";
import { HomeDeviceModule } from "./device/home-device/home-device.module";

@Module({
    imports: [
        HomeConfigModule,
        HomeDeviceModule,
    ]
})
export class HomeModule{}