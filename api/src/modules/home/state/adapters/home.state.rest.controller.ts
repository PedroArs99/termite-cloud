import { Controller, Get } from "@nestjs/common";
import { HomeState } from "../domain/HomeState.model";
import { QueryBus } from "@nestjs/cqrs";
import { GetHomeStateQuery } from "../application/queries/getHomeState.query";

@Controller("/home/state")
export class HomeStateRestController {
    constructor(private queryBus: QueryBus){}

    @Get()
    async getHomeState(): Promise<HomeState> {
        const query = new GetHomeStateQuery();
        return await this.queryBus.execute(query);
    }
}