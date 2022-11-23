import { writable } from 'svelte/store';
import type { HomeConfig } from './models/HomeConfig.model';

const initialState: HomeConfig = {
	bridgeState: 'offline',
	permitJoin: false,
	permitJoinTimeout: 0
};

export const homeConfig = writable(initialState);

// Actions
export function fetchHomeConfig() {
	fetch('/api/config')
		.then((response) => response.json())
		.then((config: HomeConfig) => homeConfig.set(config));
}

export function togglePermitJoin() {
	fetch(`/api/config/permitJoin`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((response) => response.json())
		.catch((error) => console.error(error));
}
