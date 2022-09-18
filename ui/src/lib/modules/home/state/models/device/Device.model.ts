import type { DeviceState } from "./DeviceState.model";

export interface Device {
    friendlyName: string;
    ieeeAddress: string;
    type: string;
    state: DeviceState | "undefined";
} 