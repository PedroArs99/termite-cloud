import axios from 'axios';

export interface HttpClient {
	get<T>(url: string): Promise<T>;
	put<T>(url: string, body: any): Promise<T>;
}

class AxiosHttpClient implements HttpClient {
	async get<T>(url: string): Promise<T> {
		const { data } = await axios.get(url);

		return data;
	}

	async put<T>(url: string, body: any): Promise<T> {
		const { data } = await axios.put(url, body);

		return data;
	}
}

export const httpClient = new AxiosHttpClient();
