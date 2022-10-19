import { Injectable } from "@nestjs/common";
import { HomeConfig } from "../../models/HomeConfig.model";
import { HomeConfigRepository } from "../../application/ports/HomeConfigRepository.port";

@Injectable()
export class InMemoryHomeConfigRepository implements HomeConfigRepository {
    private homeConfig: HomeConfig = HomeConfig.create("offline")

    get(): HomeConfig {
        return this.homeConfig
    }

    save(homeConfig: HomeConfig): void {
        this.homeConfig = homeConfig
    }
    
}
