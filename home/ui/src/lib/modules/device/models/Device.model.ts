export interface IDevice {
	features: Map<String, String>;
	friendlyName: string;
	state?: { [key: string]: any };
}

export class Device implements IDevice {
	constructor(
		readonly features: Map<String, String>,
		readonly friendlyName: string,
		readonly state?: { [key: string]: any }
	) {}

	static copy(that: IDevice): Device {
		return new Device(that.features, that.friendlyName, that.state);
	}

	patchState(patchedValues: { [key: string]: any }): Device {
		for (const [key, value] of Object.entries(patchedValues)) {
			this.state![key] = value;
		}

		return new Device(this.features, this.friendlyName, this.state);
	}
}
