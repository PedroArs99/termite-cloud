import { CacheModule, Module } from "@nestjs/common";
import { CacheManagerAdapter } from "./adapters/cacheManager.adapter";
import { HomeStateMqttController } from "./adapters/home.state.mqtt.controller";
import { CacheManagerPort } from "./application/ports/CacheManager.port";
import { CqrsModule } from "@nestjs/cqrs";
import { SaveHomeStateCommandHandler } from "./application/commands/save/saveHomeState.handler";
import { HomeStateRestController } from "./adapters/home.state.rest.controller";
import { GetHomeStateHandler } from "./application/queries/getHomeState.handler";

const commandHandlers = [ SaveHomeStateCommandHandler ]
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