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

	static copy(that: Device): Device {
		return new Device(that.features, that.friendlyName, that.state);
	}
}
