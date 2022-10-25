export class DeviceState {
    private constructor(private state: "ON" | "OFF"){}

    static create(state: "ON" | "OFF"): DeviceState {
        return new DeviceState(state)
    }
}