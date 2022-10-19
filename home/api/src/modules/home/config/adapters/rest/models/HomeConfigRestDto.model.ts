import { HomeConfig } from "../../../models/HomeConfig.model";

export class HomeConfigRestDto {
    bridgeState: "online" | "offline";

    static fromDomain(homeConfig: HomeConfig){
        return {
            bridgeState: homeConfig.bridgeState
        }
    }
}
