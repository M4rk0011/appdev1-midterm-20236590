# appdev1-midterm-20236590 — TaskFlow (Yadao Midterm App Exam)

**Course / project:** Applications Development 1 — Midterm lab (TaskFlow: personal task manager).

**Description:** Angular app with full task CRUD, in-memory `TaskService`, parameterized routes, and child routes for task detail (`/tasks/:id/info`, `/tasks/:id/edit`). UI uses **Bootstrap 5** for layout and components; custom CSS only themes Bootstrap (cyborg style).

**Stack:** Angular 19 (see `package.json`), TypeScript, RxJS, **Bootstrap 5.3** (CDN in `src/index.html`), **standalone** components (`standalone: true` on each component).

**Midterm checklist (technical):** `Task` interface + union types; `task.service.ts` with `getTasks`, `getTaskById`, `addTask`, `updateTask`, `deleteTask`, `toggleStatus`; routes include `tasks/new` before `tasks/:id`, child routes `info` / `edit`, wildcard; forms use `[(ngModel)]`; child views read `:id` via `route.parent.snapshot` / `route.snapshot`.

**Angular 21 (exam requirement):** Official CLI expects **Node 20.19+** or **22.12+**. This machine-friendly setup uses **Angular 19** so `ng serve` / `ng build` run on older Node. Before grading, upgrade Node, then run `ng update @angular/core@21 @angular/cli@21` and confirm `ng build` with no errors.

## Development server

```bash
ng serve
```

Open `http://localhost:4200/`.

## Build

```bash
ng build
ng build --configuration=production
```

## Tests

```bash
ng test
```

## Angular CLI

See [Angular CLI Overview](https://angular.dev/tools/cli).
