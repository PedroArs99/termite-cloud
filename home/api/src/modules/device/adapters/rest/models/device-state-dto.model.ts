import { DeviceState } from "src/modules/device/models/Device-State.model";

export class DeviceStateDto {
    power: "ON" | "OFF";

    constructor(power: "ON" | "OFF"){
        this.power = power;
    }

    static fromDomain(deviceState: DeviceState): DeviceStateDto {
        return new DeviceStateDto(deviceState.power);
    }
}

export function deviceStateDtoToDomain(dto: DeviceStateDto): DeviceState {
    return DeviceState.create(
        dto.power
    )
}