import { GetHomeStateQuery } from "./getHomeState.query";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { HomeState } from "../../domain/HomeState.model";
import { CacheManagerPort } from "../ports/CacheManager.port";

@QueryHandler(GetHomeStateQuery)
export class GetHomeStateHandler implements IQueryHandler<GetHomeStateQuery> {
    constructor(private cacheManager: CacheManagerPort){}
    
    async execute(query: GetHomeStateQuery): Promise<HomeState> {
        return {
            state: await this.cacheManager.get("bridge/state")
        }
    }
}