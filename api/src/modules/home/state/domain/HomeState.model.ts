export interface HomeState {
    bridgeLogLevel: "debug" | "info" | "warning" | "error";
    bridgePermitJoin: boolean;
    bridgePermitJoinTimeout: number;
    bridgeRestartRequired: false;
    bridgeState: "online" | "offline";
}

export const HomeStateCacheKeys = {
    bridgeLogLevel: "bridge/info/logLevel",
    bridgePermitJoin: "bridge/info/permitJoin",
    bridgePermitJoinTimeout: "bridge/info/permitJoinTimeout",
    bridgeRestartRequired: "bridge/info/restartRequired",
    bridgeState: "bridge/state"
}