import axios, { AxiosInstance } from 'axios';

export class ApiService {
    private accessToken: string | null = null;
    public api: AxiosInstance;

    constructor(baseURL: string = 'http://localhost:8080') {
        this.api = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.api.interceptors.request.use((config) => {
            if (this.accessToken && config.headers) {
                config.headers['Authorization'] = `Bearer ${this.accessToken}`;
            }
            return config;
        });
    }

    setAccessToken(token: string | null) {
        this.accessToken = token;
    }
}