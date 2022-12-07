import { httpClient } from '$lib/utils/HttpClient';
import { get, writable } from 'svelte/store';
import { Device, type IDevice } from '../models/Device.model';

function storeFactory() {
	const { set, subscribe } = writable<Device[]>([]);

	return {
		fetchDevices,
		setDevice: _setDevice(set),
		setDevices: (devices: Device[]) => set(devices),
		subscribe,
		patchDeviceState,
	};
}

function _setDevice(set: (this: void, value: Device[]) => void) {
	return (device: Device) => {
		const currentList = get(devices);
		const deviceIndex = currentList.findIndex((d) => d.friendlyName === device.friendlyName);

		if (deviceIndex === -1) {
			currentList.push(device);
		} else {
			currentList.splice(deviceIndex, 1, device);
		}

		set(currentList);
	};
}

function fetchDevices() {
	httpClient
		.get<IDevice[]>('/api/devices')
		.then((response) => response.map((device) => Device.copy(device)))
		.then((response) => devices.setDevices(response));

	initEventListening();
}

function initEventListening() {
	const eventSource = new EventSource('/api/devices/events');
	eventSource.onmessage = ({ data }) => {
		const device = Device.copy(JSON.parse(data));
		devices.setDevice(device);
	};
}

function patchDeviceState(friendlyName: string, patchedValues: Map<String, any>) {
	httpClient.put<IDevice>(`/api/devices/${friendlyName}`, patchedValues);
}

export const devices = storeFactory();
