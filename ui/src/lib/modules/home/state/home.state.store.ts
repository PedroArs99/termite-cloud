import { writable } from 'svelte/store';
import { HomeState } from './home.state.model';

// Stores
const initialState: HomeState = {
	state: 'offline'
};

export const homeState = writable<HomeState>(initialState);

// Actions
export function fetchHomeState() {
	fetch('/api/home/state')
		.then((response) => response.json())
		.then((homeState) => homeState.set(homeState))
		.catch((error) => console.error(error));
}
