import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ITask } from '@app/interfaces/task.interface';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ak-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  @Input() task!: ITask | undefined;
  @Output() updateTask = new EventEmitter<ITask>();
  @Output() deleteTask = new EventEmitter<string>();

  public taskStatusTitle$: Observable<string> | undefined;

  public ngOnInit(): void {
    this.setTaskStatusTitle();
  }

  public completeTaskHandler(): void {
    this.task!.status = !this.task?.status;
    this.setTaskStatusTitle();
    this.updateTask.emit(this.task);
  }

  public deleteTaskHandler(): void {
    this.deleteTask.emit(this.task!.slug);
  }

  private setTaskStatusTitle(): void {
    this.taskStatusTitle$ = this.task?.status
      ? of('mark as not complete')
      : of('mark as complete');
  }
}
