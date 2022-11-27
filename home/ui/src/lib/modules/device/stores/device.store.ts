import { httpClient } from '$lib/utils/HttpClient';
import { writable } from 'svelte/store';
import type { Device } from '../models/device/Device.model';

function storeFactory() {
	const { set, subscribe } = writable<Device[]>([]);

	return {
		fetchDevices,
		setDevices: (devices: Device[]) => set(devices),
		subscribe
	};
}

function fetchDevices() {
	httpClient.get<Device[]>('/api/devices')
		.then((response) => devices.setDevices(response));
}

export const devices = storeFactory();
