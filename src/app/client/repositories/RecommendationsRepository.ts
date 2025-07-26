import { TaskSuggestion } from '@client/models';
import { ApiService } from '@shared/api';

export class RecommendationsRepository {
    private apiService: ApiService;

    constructor(private readonly api: ApiService) {
        this.apiService = api;
    }

    async get(): Promise<TaskSuggestion[]> {
        const response = await this.apiService.api.get<TaskSuggestion[]>('/api/recommendations/suggestions');
        return response.data;
    }

    async patch(id: string, used: boolean = true): Promise<void> {
        await this.apiService.api.patch(`/api/recommendations/suggestions/${id}/use`, { used });
    }
}
