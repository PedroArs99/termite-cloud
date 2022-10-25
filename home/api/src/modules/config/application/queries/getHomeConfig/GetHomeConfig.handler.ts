import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { HomeConfig } from "../../../models/HomeConfig.model";
import { HomeConfigRepository } from "../../ports/HomeConfigRepository.port";
import { GetHomeConfigQuery } from "./GetHomeConfig.query";

@QueryHandler(GetHomeConfigQuery)
export class GetHomeConfigHandler implements IQueryHandler<GetHomeConfigQuery, HomeConfig> {
    constructor(@Inject("HomeConfigRepository") private repository: HomeConfigRepository){}

    async execute(query: GetHomeConfigQuery): Promise<HomeConfig> {
        return this.repository.get()
    }
}