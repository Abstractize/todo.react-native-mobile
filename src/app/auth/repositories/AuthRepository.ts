import { ApiService } from '@shared/api';
import { AuthResponse, LoginRequest, RegisterRequest, TokenActionRequest } from '../models';

export class AuthRepository {
    private apiService: ApiService;

    constructor(private readonly api: ApiService) {
        this.apiService = api;
    }

    async login(request: LoginRequest): Promise<AuthResponse> {
        const response = await this.apiService.api.post<AuthResponse>('/api/auth/login', request);
        return response.data;
    }

    async refreshToken(request: TokenActionRequest): Promise<AuthResponse> {
        const response = await this.apiService.api.post<AuthResponse>('/api/auth/refresh', request);
        return response.data;
    }

    async register(request: RegisterRequest): Promise<AuthResponse> {
        const response = await this.apiService.api.post<AuthResponse>('/api/auth/register', request);
        return response.data;
    }

    async logout(request: TokenActionRequest): Promise<void> {
        await this.apiService.api.post<void>('/api/auth/logout', request);
    }
}