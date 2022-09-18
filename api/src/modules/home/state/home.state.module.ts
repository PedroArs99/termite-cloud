import { CacheModule, Module } from "@nestjs/common";
import { CacheManagerAdapter } from "./adapters/persistence/cacheManager.adapter";
import { HomeStateMqttController } from "./adapters/mqtt/home.state.mqtt.controller";
import { CacheManagerPort } from "./application/ports/CacheManager.port";
import { CqrsModule } from "@nestjs/cqrs";
import { SaveHomeStateCommandHandler } from "./application/commands/saveState/saveHomeState.handler";
import { HomeStateRestController } from "./adapters/rest/home.state.rest.controller";
import { GetHomeStateHandler } from "./application/queries/getHomeState.handler";
import { RegisterDevicesCommandHandler } from "./application/commands/registerDevices/registerDevices.handler";

const commandHandlers = [ SaveHomeStateCommandHandler, RegisterDevicesCommandHandler ]
const controllers = [ HomeStateMqttController, HomeStateRestController ];
const queryHandlers = [ GetHomeStateHandler ]
@Module({
    controllers,
    imports: [
        CacheModule.register(),
        CqrsModule
    ],
    providers: [
        {
            provide: CacheManagerPort,
            useClass: CacheManagerAdapter
        },
        ...commandHandlers,
        ...queryHandlers
    ]
})
export class HomeStateModule{}