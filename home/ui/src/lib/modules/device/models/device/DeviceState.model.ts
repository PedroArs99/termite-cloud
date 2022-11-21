export interface DeviceState {
    power: "ON" | "OFF";
    brightness: number;
    color: string;
    colorMode: 'xy' | 'color_temp';
    colorTemperature: number;
}