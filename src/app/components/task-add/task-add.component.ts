import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css',
})
export class TaskAddComponent {
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskService);

  title = '';
  description = '';
  dueDate = '';
  status: TaskStatus = 'Pending';
  priority: TaskPriority = 'Medium';

  readonly statuses: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];
  readonly priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

  submit(): void {
    const title = this.title.trim();
    if (!title) {
      alert('Title is required.');
      return;
    }
    if (!this.dueDate) {
      alert('Due date is required.');
      return;
    }
    this.taskService.addTask({
      title,
      description: this.description.trim(),
      dueDate: this.dueDate,
      status: this.status,
      priority: this.priority,
      createdAt: new Date().toISOString().slice(0, 10),
    });
    alert('Task added successfully.');
    void this.router.navigate(['/tasks']);
  }
}
