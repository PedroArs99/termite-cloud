import { writable } from 'svelte/store';
import { Device } from '../models/device/Device.model';
import { io } from 'socket.io-client';

export const devices = writable<Array<Device>>([]);

// Actions
export function fetchDevices() {
	fetch('/api/devices')
		.then((response) => response.json())
		.then((response) =>
			response.map((object: Device) => new Device(object.friendlyName, object.state))
		)
		.then((response) => devices.set(response))
		.then((_) => initWebSockets())
		.catch((error) => console.error(error));
}

function initWebSockets() {
	const socket = io('/events/devices');

	socket.on('deviceUpserted', () => fetchDevices());
}

export function toggleDeviceState(device: Device) {
	console.log(device);
	const toggledDevice = device.toggleDeviceState();

	fetch(`/api/devices/${device.friendlyName}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(toggledDevice.state)
	})
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((error) => console.error(error));
}
