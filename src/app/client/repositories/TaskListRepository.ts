import { TaskList } from '@client/models';
import { ApiService } from '@shared/api';

export class TaskListRepository {
    private apiService: ApiService;

    constructor(private readonly api: ApiService) {
        this.apiService = api;
    }

    async find(id: string): Promise<TaskList> {
        const response = await this.apiService.api.get<TaskList>(`/api/tasks/tasklist/${id}`);
        return response.data;
    }

    async get(): Promise<TaskList[]> {
        const response = await this.apiService.api.get<TaskList[]>('/api/tasks/tasklist');
        return response.data;
    }

    async add(taskList: TaskList): Promise<void> {
        await this.apiService.api.post('/api/tasks/tasklist', taskList);
    }

    async update(taskList: TaskList): Promise<void> {
        await this.apiService.api.put(`/api/tasks/tasklist/${taskList.id}`, taskList);
    }

    async delete(id: string): Promise<void> {
        await this.apiService.api.delete(`/api/tasks/tasklist/${id}`);
    }
}