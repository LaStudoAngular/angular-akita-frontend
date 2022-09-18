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
  @Output() editTask = new EventEmitter<ITask>();

  public taskStatusTitle$: Observable<string> | undefined;

  public ngOnInit(): void {
    this.setTaskStatusTitle();
  }

  public completeTask(): void {
    this.task!.status = !this.task?.status;
    this.setTaskStatusTitle();
    this.editTask.emit(this.task);
  }

  private setTaskStatusTitle(): void {
    this.taskStatusTitle$ = this.task?.status
      ? of('mark as not complete')
      : of('mark as complete');
  }
}
