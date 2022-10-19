import { Module } from "@nestjs/common";
import { HomeConfigModule } from "./config/home-config/home-config.module";
import { HomeDeviceModule } from "./device/home-device/home-device.module";
import { HomeStateModule } from "./state/home.state.module";

@Module({
    imports: [
        HomeConfigModule,
        HomeDeviceModule,
        HomeStateModule
    ]
})
export class HomeModule{}