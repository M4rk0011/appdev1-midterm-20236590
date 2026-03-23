import { Component, OnInit, inject, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
})
export class TaskEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly taskService = inject(TaskService);

  readonly taskId = this.route.parent!.snapshot.paramMap.get('id');

  title = '';
  description = '';
  dueDate = '';
  status: TaskStatus = 'Pending';
  priority: TaskPriority = 'Medium';

  readonly statuses: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];
  readonly priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

  readonly task = computed(() => {
    const id = this.taskId;
    this.taskService.tasks();
    return id ? this.taskService.getTaskById(id) : undefined;
  });

  ngOnInit(): void {
    const t = this.task();
    if (t) {
      this.title = t.title;
      this.description = t.description;
      this.dueDate = t.dueDate;
      this.status = t.status;
      this.priority = t.priority;
    }
  }

  submit(): void {
    const id = this.taskId;
    if (!id) {
      return;
    }
    const title = this.title.trim();
    if (!title) {
      alert('Title is required.');
      return;
    }
    this.taskService.updateTask(id, {
      title,
      description: this.description.trim(),
      dueDate: this.dueDate,
      status: this.status,
      priority: this.priority,
    });
    alert('Task updated successfully.');
    void this.router.navigate(['/tasks', id, 'info']);
  }
}
