import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: "http://localhost:3000"
			},
			'/socket.io': {
				target: 'ws://localhost:3000',
				ws: true
			  }
		}
	}
};

export default config;
