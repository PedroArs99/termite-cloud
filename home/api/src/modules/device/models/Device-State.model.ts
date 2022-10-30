export class DeviceState {
    private constructor(
        readonly power: "ON" | "OFF",
        readonly brightness: number
    ){}

    static create(
        power: "ON" | "OFF",
        brightness: number
    ): DeviceState {
        return new DeviceState(power, brightness)
    }
}