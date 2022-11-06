import { DeviceState } from "src/modules/device/models/Device-State.model";

export class DeviceStateDto {
    power: "ON" | "OFF";
    brightness: number;
    colorTemperature: number;

    constructor(power: "ON" | "OFF", brightness: number, colorTemperature: number){
        this.power = power;
        this.brightness = brightness;
        this.colorTemperature = colorTemperature;
    }

    static fromDomain(deviceState: DeviceState): DeviceStateDto {
        return new DeviceStateDto(deviceState.power, deviceState.brightness, deviceState.colorTemperature);
    }
}

export function deviceStateDtoToDomain(dto: DeviceStateDto): DeviceState {
    return DeviceState.create(
        dto.power,
        dto.brightness,
        dto.colorTemperature,
    )
}