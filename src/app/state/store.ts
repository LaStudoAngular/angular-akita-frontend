import { ITask } from '@app/interfaces/task.interface';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface ITaskState {
  tasks: ITask[];
  isLoaded: boolean;
}

export const initialStore = (): ITaskState => {
  return {
    tasks: [],
    isLoaded: false,
  };
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'task' })
export class TaskStore extends Store<ITaskState> {
  constructor() {
    super(initialStore());
  }
}
