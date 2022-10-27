import type { DeviceState } from './DeviceState.model';

export class Device {
	readonly friendlyName: string;
	readonly state: DeviceState;

	constructor(friendlyName: string, state: DeviceState) {
		(this.friendlyName = friendlyName), (this.state = state);
	}

	toggleDeviceState(): Device {
		const toggledState = {
			...this.state,
			power: this.state.power === 'ON' ? 'OFF' : ('ON' as 'ON' | 'OFF')
		};

		return new Device(this.friendlyName, toggledState);
	}
}
