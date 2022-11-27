import { writable } from 'svelte/store';
import type { Device } from '../models/device/Device.model';

function storeFactory() {
	const {subscribe, set, update} = writable<Device[]>();

	return {
		subscribe,
	}
} 

export const devices = storeFactory();
