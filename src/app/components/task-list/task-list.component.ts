import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  readonly taskService = inject(TaskService);

  get priorityClass() {
    return (p: Task['priority']) => this.taskService.priorityClass(p);
  }

  get statusClass() {
    return (s: Task['status']) => this.taskService.statusClass(s);
  }

  deleteTask(id: string, title: string): void {
    if (!confirm(`Delete task "${title}"?`)) {
      return;
    }
    this.taskService.deleteTask(id);
  }

  toggleStatus(id: string): void {
    this.taskService.toggleStatus(id);
  }
}
