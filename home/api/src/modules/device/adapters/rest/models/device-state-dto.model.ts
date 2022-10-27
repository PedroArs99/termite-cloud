import { DeviceState } from "src/modules/device/models/Device-State.model";

export interface DeviceStateDto {
    power: "ON" | "OFF";
}

export function deviceStateDtoToDomain(dto: DeviceStateDto): DeviceState {
    return DeviceState.create(
        dto.power
    )
}