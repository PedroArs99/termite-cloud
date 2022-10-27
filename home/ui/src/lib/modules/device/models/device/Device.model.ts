import type { DeviceState } from "./DeviceState.model";

export interface Device {
    friendlyName: string;
    state: DeviceState;
}

export class DeviceImpl implements Device {
    readonly friendlyName: string;
    readonly state: DeviceState;

    constructor(friendlyName: string, state: DeviceState){
        this.friendlyName = friendlyName;
        this.state = state;
    }

    toggleDeviceState(): Device {
        const toggledState = {
            ...this.state,
            power: this.state.power === "ON" ? "OFF": "ON"
        }

        return new DeviceImpl(this.friendlyName, toggledState)
    };
}
