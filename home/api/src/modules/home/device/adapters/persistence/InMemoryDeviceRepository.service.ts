import { Injectable } from "@nestjs/common";
import { DeviceRepository } from "../../application/ports/DeviceRepository.port";
import { Device } from "../../models/Device.model";

@Injectable()
export class InMemoryDeviceRepository implements DeviceRepository {
    private devices: Array<Device> = new Array();
    
    upsertAll(devices: Device[]): void {
        this.devices = devices;
    }

}