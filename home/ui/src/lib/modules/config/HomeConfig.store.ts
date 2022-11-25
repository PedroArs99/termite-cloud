import { derived, get, writable } from 'svelte/store';
import type { HomeConfig } from './models/HomeConfig.model';

const initialState: HomeConfig = {
	bridgeState: 'offline',
	permitJoin: false
};

export const homeConfig = writable(initialState);

// Actions
export function fetchHomeConfig() {
	fetch('/api/config')
		.then((response) => response.json())
		.then((config: HomeConfig) => homeConfig.set(config));
}

export function togglePermitJoin() {
	const currentState = get(homeConfig);
	console.log('State Before: ', currentState);

	fetch(`/api/config`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			permitJoin: !get(homeConfig).permitJoin
		})
	})
		.then((response) => response.json())
		.then((config: HomeConfig) => homeConfig.set(config));		
}
