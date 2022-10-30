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
	const toggledDevice = device.toggleDeviceState();
	putDeviceState(toggledDevice);
}

export function updateDeviceBrightness(device: Device, brightness: number) {
	const updatedDevice = device.updateState(brightness);
	putDeviceState(updatedDevice);
}

function putDeviceState(device: Device) {
	fetch(`/api/devices/${device.friendlyName}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(device.state)
	})
		.then((response) => response.json())
		.catch((error) => console.error(error));
}
