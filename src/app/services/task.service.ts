import { Injectable, signal } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../models/task.model';

const STATUS_CYCLE: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];

function seedTasks(): Task[] {
  return [
    {
      id: '1',
      title: 'Design landing page',
      description: 'Wireframes and hero section for TaskFlow marketing site.',
      dueDate: '2026-04-01',
      status: 'Pending',
      priority: 'High',
      createdAt: '2026-03-15',
    },
    {
      id: '2',
      title: 'Implement task list API',
      description: 'Wire TaskService CRUD to in-memory store with signals.',
      dueDate: '2026-03-28',
      status: 'In Progress',
      priority: 'Medium',
      createdAt: '2026-03-10',
    },
    {
      id: '3',
      title: 'Write README',
      description: 'Document setup, routes, and deployment notes.',
      dueDate: '2026-03-20',
      status: 'Completed',
      priority: 'Low',
      createdAt: '2026-03-01',
    },
  ];
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly tasksSignal = signal<Task[]>(seedTasks());

  readonly tasks = this.tasksSignal.asReadonly();

  getTasks(): Task[] {
    return this.tasksSignal();
  }

  getTaskById(id: string): Task | undefined {
    return this.tasksSignal().find((t) => t.id === id);
  }

  addTask(
    data: Omit<Task, 'id'> & { id?: string }
  ): Task {
    const today = new Date().toISOString().slice(0, 10);
    const task: Task = {
      id: data.id ?? crypto.randomUUID(),
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      status: data.status,
      priority: data.priority,
      createdAt: data.createdAt ?? today,
    };
    this.tasksSignal.update((tasks) => [...tasks, task]);
    return task;
  }

  updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Task | undefined {
    let updated: Task | undefined;
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => {
        if (t.id !== id) {
          return t;
        }
        updated = { ...t, ...updates };
        return updated;
      })
    );
    return updated;
  }

  deleteTask(id: string): void {
    this.tasksSignal.update((tasks) => tasks.filter((t) => t.id !== id));
  }

  toggleStatus(id: string): Task | undefined {
    const current = this.getTaskById(id);
    if (!current) {
      return undefined;
    }
    const idx = STATUS_CYCLE.indexOf(current.status);
    const next: TaskStatus =
      idx >= 0 ? STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length] : 'Pending';
    return this.updateTask(id, { status: next });
  }

  priorityClass(priority: TaskPriority): string {
    switch (priority) {
      case 'High':
        return 'bg-danger';
      case 'Medium':
        return 'bg-warning text-dark';
      case 'Low':
        return 'bg-secondary';
    }
  }

  statusClass(status: TaskStatus): string {
    switch (status) {
      case 'Completed':
        return 'bg-success';
      case 'In Progress':
        return 'bg-primary';
      case 'Pending':
        return 'bg-info text-dark';
    }
  }
}
