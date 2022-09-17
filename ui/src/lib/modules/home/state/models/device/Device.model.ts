export interface Device {
    friendlyName: string;
    ieeeAddress: string;
    type: string;
    state: "ON" | "OFF" | "undefined";
} 