export class DeviceState {
    private constructor(
        readonly power: "ON" | "OFF",
        readonly brightness: number,
        readonly colorTemperature: number
    ){}

    static create(
        power: "ON" | "OFF",
        brightness: number,
        colorTemperature: number
    ): DeviceState {
        return new DeviceState(power, brightness, colorTemperature)
    }
}