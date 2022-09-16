export interface Device {
    friendlyName: string;
    ieeeAddress: string;
    type: "Coordinator" | "Router";
} 