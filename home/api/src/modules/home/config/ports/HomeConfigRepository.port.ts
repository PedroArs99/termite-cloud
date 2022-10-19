import { HomeConfig } from "../models/HomeConfig.model";

export interface HomeConfigRepository {
    get(): HomeConfig
    save(homeConfig: HomeConfig): void
}