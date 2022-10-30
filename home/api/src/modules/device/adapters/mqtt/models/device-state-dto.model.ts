import { DeviceState } from "src/modules/device/models/Device-State.model";

export interface DeviceStateDto {
    state: "ON" | "OFF"
    brightness: number
}

export function deviceStateToDomain(dto: DeviceStateDto): DeviceState {
    return DeviceState.create(dto.state, dto.brightness);
}

export function deviceStateDtoFromDomain(deviceState: DeviceState): DeviceStateDto {
    return {
        state: deviceState.power,
        brightness: deviceState.brightness
    }
}