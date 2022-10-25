import { writable } from 'svelte/store';
import type { Device } from '../models/device/Device.model';
import { io } from "socket.io-client";

export const devices = writable<Array<Device>>([]);

// Actions
export function fetchDevices() {
	fetch('/api/devices')
		.then((response) => response.json())
		.then((response) => devices.set(response))
		.then(_ => initWebSockets())
		.catch((error) => console.error(error));
}

function initWebSockets() {
	const socket = io("/events")

	socket.on("device", () => fetchDevices())
}
