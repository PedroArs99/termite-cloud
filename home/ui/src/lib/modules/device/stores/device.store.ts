import { writable } from 'svelte/store';
import type { Device } from '../models/device/Device.model';

export const devices = writable<Array<Device>>([]);

// Actions
export function fetchDevices() {
	fetch('/api/devices')
		.then((response) => response.json())
		.then((response) => devices.set(response))
		.catch((error) => console.error(error));
}
