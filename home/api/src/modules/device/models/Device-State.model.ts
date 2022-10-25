export class DeviceState {
    private constructor(readonly power: "ON" | "OFF"){}

    static create(power: "ON" | "OFF"): DeviceState {
        return new DeviceState(power)
    }
}