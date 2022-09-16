import { Query } from '@datorama/akita';
import { ITaskState, TaskStore } from '@state/store';
import { Observable } from 'rxjs';
import { ITask } from '@app/interfaces/task.interface';

export class TaskQuery extends Query<ITaskState> {
  constructor(private readonly taskStore: TaskStore) {
    super(taskStore);
  }

  public getTasks(): Observable<ITask[]> {
    return this.select((state: ITaskState) => state.tasks);
  }

  public getLoaded(): Observable<boolean> {
    return this.select((state: ITaskState) => state.isLoaded);
  }

  public getLoading(): Observable<boolean> {
    return this.selectLoading();
  }
}
