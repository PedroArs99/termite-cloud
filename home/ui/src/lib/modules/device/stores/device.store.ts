import { httpClient } from '$lib/utils/HttpClient';
import { writable } from 'svelte/store';
import { Device, type IDevice } from '../models/Device.model';

function storeFactory() {
	const { set, subscribe } = writable<Device[]>([]);

	return {
		fetchDevices,
		setDevices: (devices: Device[]) => set(devices),
		subscribe
	};
}

function fetchDevices() {
	httpClient
		.get<IDevice[]>('/api/devices')
		.then((response) => response.map((device) => Device.copy(device)))
		.then((response) => devices.setDevices(response));
}

export const devices = storeFactory();
