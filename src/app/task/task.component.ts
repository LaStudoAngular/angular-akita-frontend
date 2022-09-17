import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITask } from '@app/interfaces/task.interface';

@Component({
  selector: 'ak-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() task: ITask | undefined;
}
