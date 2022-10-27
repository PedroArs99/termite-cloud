import { Event } from "src/modules/common/Event.model";
import { Device } from "../Device.model";

export class DeviceMqttContextUpdated extends Event {
    constructor(readonly device: Device){
        super("deviceMqttContextUpdated")
    }
}