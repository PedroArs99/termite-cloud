import { Event } from "src/modules/common/Event.model";

export class DeviceUpsertedEvent extends Event {
    constructor(readonly friendly_name: string){
        super("deviceUpserted")
    }
}