import axios from 'axios';

export interface HttpClient {
	get<T>(url: string): Promise<T>;
}

class AxiosHttpClient implements HttpClient {
	async get<T>(url: string): Promise<T> {
		const { data } = await axios.get(url);

		return data;
	}
}

export const httpClient = new AxiosHttpClient();
