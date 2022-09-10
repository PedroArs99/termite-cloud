import type { Device } from "./device/Device.model";

export interface HomeState {
    bridgeLogLevel: "debug" | "info" | "warning" | "error";
    bridgePermitJoin: boolean;
    bridgePermitJoinTimeout: number;
    bridgeRestartRequired: boolean;
    bridgeState: "online" | "offline";
    devices: Array<Device>;
}