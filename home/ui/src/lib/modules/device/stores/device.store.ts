import { httpClient } from '$lib/utils/HttpClient';
import { get, writable } from 'svelte/store';
import { Device, type IDevice } from '../models/Device.model';

function storeFactory() {
	const { set, subscribe } = writable<Device[]>([]);

	return {
		fetchDevices,
		setDevices: (devices: Device[]) => set(devices),
		subscribe,
		updateDeviceState
	};
}

function fetchDevices() {
	httpClient
		.get<IDevice[]>('/api/devices')
		.then((response) => response.map((device) => Device.copy(device)))
		.then((response) => devices.setDevices(response));
}

function patchDeviceState(device: Device) {
	httpClient.put<IDevice>(`/api/devices/${device.friendlyName}`, device.state).then((response) => {
		const currentState = get(devices);

		const indexOfDevice = currentState.findIndex((d) => d.friendlyName === response.friendlyName);

		if (indexOfDevice >= 0) {
			const newState = currentState.splice(indexOfDevice, 1, Device.copy(response));
			devices.setDevices(newState);
		}
	});
}

function updateDeviceState(friendlyName: string, key: string, value: any) {
	const currentState = get(devices);
	let device = currentState.find((d) => d.friendlyName === friendlyName);

	if (device) {
		device = device.patchState(key, value);

		patchDeviceState(device);
	}
}

export const devices = storeFactory();
