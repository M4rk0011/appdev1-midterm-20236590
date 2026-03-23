import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskInfoComponent } from './components/task-info/task-info.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks/new', component: TaskAddComponent },
  { path: 'tasks', component: TaskListComponent },
  {
    path: 'tasks/:id',
    component: TaskDetailComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'info' },
      { path: 'info', component: TaskInfoComponent },
      { path: 'edit', component: TaskEditComponent },
    ],
  },
  { path: '**', redirectTo: 'tasks' },
];
