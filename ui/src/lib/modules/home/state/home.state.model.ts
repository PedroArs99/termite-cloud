export interface HomeState {
    bridgeLogLevel: "debug" | "info" | "warning" | "error";
    bridgePermitJoin: boolean;
    bridgePermitJoinTimeout: number;
    bridgeRestartRequired: boolean;
    bridgeState: "online" | "offline"
}