import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskInfoComponent } from './components/task-info/task-info.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks/new', component: TaskAddComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  {
    path: 'tasks/:id',
    component: TaskDetailComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'info' },
      { path: 'info', component: TaskInfoComponent },
      { path: 'edit', component: TaskEditComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
