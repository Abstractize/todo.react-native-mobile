import { ApiService } from '@shared/api';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models';
import { AuthRepository } from '../repositories';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthService {
    private accessTokenKey = 'access_token';
    private refreshTokenKey = 'refresh_token';

    constructor(private readonly apiService: ApiService, private readonly authRepository: AuthRepository) { }

    async initializeAuth(): Promise<void> {
        const token = await this.getAccessToken();
        this.apiService.setAccessToken(token);

        const hasAccess = await this.hasValidAccessToken();
        const hasRefresh = await this.getRefreshToken();

        if (hasAccess) {
            return;
        }

        if (hasRefresh) {
            try {
                await this.refreshToken();
            } catch {
                this.forceLogout();
            }
            return;
        }

        this.forceLogout();
    }

    async login(request: LoginRequest): Promise<void> {
        const res = await this.authRepository.login(request);
        await this.storeTokens(res);
    }

    async register(request: RegisterRequest): Promise<void> {
        const res = await this.authRepository.register(request);
        await this.storeTokens(res);
    }

    async logout(): Promise<void> {
        const refreshToken = await this.getRefreshToken();
        if (!refreshToken) {
            this.forceLogout();
            return;
        }

        try {
            await this.authRepository.logout({ refreshToken });
        } finally {
            this.forceLogout();
        }
    }

    async refreshToken(): Promise<void> {
        const refreshToken = await this.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token found');

        try {
            const res = await this.authRepository.refreshToken({ refreshToken });
            await this.storeTokens(res);
        } catch (err) {
            this.forceLogout();
            throw err;
        }
    }

    async getAccessToken(): Promise<string | null> {
        return AsyncStorage.getItem(this.accessTokenKey);
    }

    async getRefreshToken(): Promise<string | null> {
        return AsyncStorage.getItem(this.refreshTokenKey);
    }

    async getUserId(): Promise<string> {
        const token = await this.getAccessToken();
        if (!token) return '';
        const payload = this.decodeJwtPayload(token);
        return payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || '';
    }

    async getUserFullName(): Promise<string> {
        const token = await this.getAccessToken();
        if (!token) return '';
        const payload = this.decodeJwtPayload(token);
        return payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '';
    }

    // ===== Private Helpers =====

    private async storeTokens(res: AuthResponse): Promise<void> {
        await AsyncStorage.setItem(this.accessTokenKey, res.token);
        await AsyncStorage.setItem(this.refreshTokenKey, res.refreshToken);
        this.apiService.setAccessToken(res.token);
    }

    private async clearTokens(): Promise<void> {
        await AsyncStorage.removeItem(this.accessTokenKey);
        await AsyncStorage.removeItem(this.refreshTokenKey);
        this.apiService.setAccessToken(null);
    }

    private async hasValidAccessToken(): Promise<boolean> {
        const token = await this.getAccessToken();
        if (!token) return false;

        const payload = this.decodeJwtPayload(token);
        const exp = payload?.exp;
        const now = Math.floor(Date.now() / 1000);
        return !!exp && exp > now;
    }

    private decodeJwtPayload(token: string): any | null {
        try {
            const base64 = token.split('.')[1];
            const json = Buffer.from(base64, 'base64').toString();
            return JSON.parse(json);
        } catch {
            return null;
        }
    }

    private forceLogout(): void {
        this.clearTokens();
    }
}