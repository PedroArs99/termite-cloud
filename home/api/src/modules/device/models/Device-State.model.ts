export class DeviceState {
    private constructor(
        readonly power: "ON" | "OFF",
        readonly brightness: number,
        readonly color: string,
        readonly colorMode: 'xy' | 'color_temp',
        readonly colorTemperature: number,
    ){}

    static create(
        power: "ON" | "OFF",
        brightness: number,
        color: string,
        colorMode: 'xy' | 'color_temp',
        colorTemperature: number,
    ): DeviceState {
        return new DeviceState(power, brightness, color, colorMode, colorTemperature)
    }
}