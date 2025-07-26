import { TaskItem } from '@client/models';
import { ApiService } from '@shared/api';

export class TaskItemRepository {
    private apiService: ApiService;

    constructor(private readonly api: ApiService) {
        this.apiService = api;
    }

    async getByTaskListId(taskListId: string): Promise<TaskItem[]> {
        const response = await this.apiService.api.get<TaskItem[]>(`/api/tasks/taskitem/${taskListId}`);
        return response.data;
    }

    async add(taskItem: TaskItem): Promise<void> {
        await this.apiService.api.post('/api/tasks/taskitem', taskItem);
    }

    async update(taskItem: TaskItem): Promise<void> {
        await this.apiService.api.put(`/api/tasks/taskitem/${taskItem.id}`, taskItem);
    }

    async delete(id: string): Promise<void> {
        await this.apiService.api.delete(`/api/tasks/taskitem/${id}`);
    }
}