import { DeviceState } from "./DeviceState.model";

export interface Device {
    friendlyName: string;
    ieeeAddress: string;
    type: "Coordinator" | "Router";
    state: DeviceState | "undefined";
} 