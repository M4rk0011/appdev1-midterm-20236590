import { Component, OnInit, inject, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly taskService = inject(TaskService);

  readonly taskId = this.route.snapshot.paramMap.get('id');

  readonly task = computed(() => {
    const id = this.taskId;
    this.taskService.tasks();
    return id ? this.taskService.getTaskById(id) : undefined;
  });

  ngOnInit(): void {
    if (!this.taskId || !this.taskService.getTaskById(this.taskId)) {
      alert('Invalid task id.');
      void this.router.navigate(['/tasks']);
    }
  }

  statusClass(): string {
    const t = this.task();
    return t ? this.taskService.statusClass(t.status) : '';
  }
}
