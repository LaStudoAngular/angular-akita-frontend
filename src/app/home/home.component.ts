import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITask } from '@app/interfaces/task.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppService } from '@services/app.service';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ak-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public tasks$!: Observable<ITask[]> | undefined;

  constructor(
    private readonly router: Router,
    private readonly appService: AppService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  public addTask(): void {
    this.router.navigateByUrl('tasks').then();
  }

  public updateTask(updateTask: ITask): void {
    this.appService
      .updateTask(updateTask)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  public deleteTask(slug: string): void {
    this.appService
      .deleteTask(slug)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.getTasks();
      });
  }

  public trackTasks(index: number, task: ITask): string {
    return task.slug;
  }

  private getTasks(): void {
    this.tasks$ = this.appService.getAllTasks();
  }
}
