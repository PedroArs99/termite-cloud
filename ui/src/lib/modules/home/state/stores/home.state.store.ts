import { writable } from 'svelte/store';
import type { HomeState } from '../models/HomeState.model';

// Stores
const initialState: HomeState = {
	bridgeLogLevel: 'error',
	bridgePermitJoin: false,
	bridgePermitJoinTimeout: -1,
	bridgeRestartRequired: true,
	bridgeState: 'offline',
	devices: []
};

export const homeState = writable<HomeState>(initialState);

// Actions
export function fetchHomeState() {
	fetch('/api/home/state')
		.then((response) => response.json())
		.then((response) => homeState.set(response))
		.catch((error) => console.error(error));
}
