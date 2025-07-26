export interface TaskItem {
    id: string | null;
    title: string;
    isCompleted: boolean;

    taskListId: string | null;
}