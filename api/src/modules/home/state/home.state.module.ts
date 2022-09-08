import { CacheModule, Module } from "@nestjs/common";
import { CacheManagerAdapter } from "./adapters/cacheManager.adapter";
import { HomeStateMqttController } from "./adapters/home.state.mqtt.controller";
import { CacheManagerPort } from "./application/ports/CacheManager.port";

@Module({
    controllers: [
        HomeStateMqttController
    ],
    imports: [
        CacheModule.register()
    ],
    providers: [
        {
            provide: CacheManagerPort,
            useClass: CacheManagerAdapter
        }
    ]
})
export class HomeStateModule{}