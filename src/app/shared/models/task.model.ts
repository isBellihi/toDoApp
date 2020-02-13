export interface TaskModel {
    id?: string;
    title: string;
    description: string;
    completed: false;
    assignedTo?: string;
}
