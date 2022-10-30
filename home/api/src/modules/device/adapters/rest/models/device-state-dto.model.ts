import { DeviceState } from "src/modules/device/models/Device-State.model";

export class DeviceStateDto {
    power: "ON" | "OFF";
    brightness: number;

    constructor(power: "ON" | "OFF", brightness: number){
        this.power = power;
        this.brightness = brightness;
    }

    static fromDomain(deviceState: DeviceState): DeviceStateDto {
        return new DeviceStateDto(deviceState.power, deviceState.brightness);
    }
}

export function deviceStateDtoToDomain(dto: DeviceStateDto): DeviceState {
    return DeviceState.create(
        dto.power,
        dto.brightness
    )
}