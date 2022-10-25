import { Injectable } from "@nestjs/common";
import { DeviceRepository } from "../../application/ports/DeviceRepository.port";
import { Device } from "../../models/Device.model";

@Injectable()
export class InMemoryDeviceRepository implements DeviceRepository {
    private devices: Array<Device> = new Array();
    
    findAll(): Array<Device> {
        return this.devices;
    }

    findByFriendlyName(friendlyName: string): Device {
        return this.devices.find((device) => device.friendlyName === friendlyName);
    }

    upsertAll(devices: Device[]): void {
        this.devices = devices;
    }

}