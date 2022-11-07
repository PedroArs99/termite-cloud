export class DeviceState {
    private constructor(
        readonly power: "ON" | "OFF",
        readonly brightness: number,
        readonly colorTemperature: number,
        readonly color: string
    ){}

    static create(
        power: "ON" | "OFF",
        brightness: number,
        colorTemperature: number,
        color: string
    ): DeviceState {
        return new DeviceState(power, brightness, colorTemperature, color)
    }
}