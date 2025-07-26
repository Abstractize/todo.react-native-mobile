import { AnalyticsSummary, WeeklyAnalytics } from "@client/models";
import { ApiService } from "@shared/api";

export class AnalyticsRepository {
    private apiService: ApiService;

    constructor(private readonly api: ApiService) {
        this.apiService = api;
    }

    async getSummary(): Promise<AnalyticsSummary> {
        const response = await this.apiService.api.get<AnalyticsSummary>('/api/analytics/summary');
        return response.data;
    }

    async getWeekly(today: Date): Promise<WeeklyAnalytics> {
        const response = await this.apiService.api.get<WeeklyAnalytics>('/api/analytics/weekly', {
            params: { dayUtc: today.toISOString() },
        });
        return response.data;
    }
}