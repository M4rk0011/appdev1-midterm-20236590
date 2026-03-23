import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-info',
  standalone: true,
  imports: [NgClass],
  templateUrl: './task-info.component.html',
  styleUrl: './task-info.component.css',
})
export class TaskInfoComponent {
  private readonly route = inject(ActivatedRoute);
  readonly taskService = inject(TaskService);

  readonly taskId = this.route.parent!.snapshot.paramMap.get('id');

  readonly task = computed(() => {
    const id = this.taskId;
    this.taskService.tasks();
    return id ? this.taskService.getTaskById(id) : undefined;
  });

  priorityClass(): string {
    const t = this.task();
    return t ? this.taskService.priorityClass(t.priority) : '';
  }

  statusClass(): string {
    const t = this.task();
    return t ? this.taskService.statusClass(t.status) : '';
  }
}
