import { DeviceState } from "../../../domain/device/DeviceState.model";

export interface DeviceStateMessage {
    state: "ON" | "OFF"
}

export function messageToDeviceState(deviceState:DeviceStateMessage): DeviceState {
    return {
        state: deviceState.state
    }
}