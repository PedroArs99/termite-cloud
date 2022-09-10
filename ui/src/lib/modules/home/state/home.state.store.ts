import { writable } from 'svelte/store';
import type { HomeState } from './home.state.model';

// Stores
const initialState: HomeState = {
	bridgeState: 'offline'
};

export const homeState = writable<HomeState>(initialState);

// Reducers
function setBridgeState(state: 'online' | 'offline'): HomeState {
	return {
		...homeState,
		bridgeState: state
	}
}


// Actions
export function fetchHomeState() {
	fetch('/api/home/state')
		.then((response) => response.json())
		.then((response) => homeState.set(setBridgeState(response.bridgeState)))
		.catch((error) => console.error(error));
}
