import { GetHomeStateQuery } from "./getHomeState.query";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { HomeState, HomeStateCacheKeys } from "../../domain/HomeState.model";
import { CacheManagerPort } from "../ports/CacheManager.port";

@QueryHandler(GetHomeStateQuery)
export class GetHomeStateHandler implements IQueryHandler<GetHomeStateQuery> {
    constructor(private cacheManager: CacheManagerPort){}
    
    async execute(query: GetHomeStateQuery): Promise<HomeState> {
        return {
            bridgeLogLevel: this.cacheManager.get(HomeStateCacheKeys.bridgeLogLevel),
            bridgePermitJoin: this.cacheManager.get(HomeStateCacheKeys.bridgePermitJoin),
            bridgePermitJoinTimeout: this.cacheManager.get(HomeStateCacheKeys.bridgePermitJoinTimeout),
            bridgeRestartRequired: this.cacheManager.get(HomeStateCacheKeys.bridgeRestartRequired),
            bridgeState: this.cacheManager.get(HomeStateCacheKeys.bridgeState),
        }
    }
}