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
		updateDeviceState
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

function patchDeviceState(device: Device) {
	httpClient.put<IDevice>(`/api/devices/${device.friendlyName}`, device.state).then((response) => {
		const currentState = get(devices);

		const indexOfDevice = currentState.findIndex((d) => d.friendlyName === response.friendlyName);

		if (indexOfDevice >= 0) {
			currentState.splice(indexOfDevice, 1, Device.copy(response));
			devices.setDevices(currentState);
		}
	});
}

function updateDeviceState(friendlyName: string, patchedValues: { [key: string]: any }) {
	const currentState = get(devices);
	let device = currentState.find((d) => d.friendlyName === friendlyName);
	
	if (device) {
		device!.state = patchedValues;
		patchDeviceState(device);
	}
}

export const devices = storeFactory();
