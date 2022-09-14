import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Observable } from 'rxjs';
import { ITask } from './task/task.interface';

@Component({
  selector: 'ak-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  public tasks$!: Observable<ITask[]> | undefined;

  constructor(private readonly service: AppService) {}

  ngOnInit(): void {
    this.tasks$ = this.service.getTasks();
  }
}
