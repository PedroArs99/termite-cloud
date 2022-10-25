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

    upsert(device: Device): void {
        const index = this.devices.findIndex(d => d.friendlyName === device.friendlyName );
        if(index >= 0){
            this.devices = this.devices.splice(index, 1)
        } 
        this.devices = [...this.devices, device]
    }

    upsertAll(devices: Device[]): void {
        this.devices = devices;
    }

}