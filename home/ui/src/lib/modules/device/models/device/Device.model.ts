import type { DeviceState } from "./DeviceState.model";

export interface Device {
    friendlyName: string;
    state: DeviceState;
} 