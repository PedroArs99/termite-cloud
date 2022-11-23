import { Event } from "src/modules/common/Event.model";
import { HomeConfig } from "./HomeConfig.model";

export class BridgeInfoUpdatedEvent extends Event {
    constructor(readonly config: HomeConfig){
        super("bridgeInfoUpdated")
    }
}