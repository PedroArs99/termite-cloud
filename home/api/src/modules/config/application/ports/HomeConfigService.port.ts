import { HomeConfig } from "../../models/HomeConfig.model";

export interface HomeConfigService {
    publishHomeConfig(homeConfig: HomeConfig): Promise<void>
}