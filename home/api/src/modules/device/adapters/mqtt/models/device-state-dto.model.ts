import { DeviceState } from "src/modules/device/models/Device-State.model";

export interface DeviceStateDto {
    state: "ON" | "OFF"
}

export function deviceStateToDomain(dto: DeviceStateDto): DeviceState {
    return DeviceState.create(dto.state);
}

export function deviceStateDtoFromDomain(deviceState: DeviceState): DeviceStateDto {
    return {
        state: deviceState.power
    }
}