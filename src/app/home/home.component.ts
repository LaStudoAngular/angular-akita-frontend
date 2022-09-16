import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { Observable } from 'rxjs';
import { ITask } from '@app/interfaces/task.interface';

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
    this.tasks$ = this.appService.getAllTasks();
  }

  public addTask(): void {
    this.router.navigateByUrl('tasks').then();
  }

  public trackTasks(index: number, task: ITask): string {
    return task.slug;
  }
}
