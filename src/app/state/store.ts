import { ITask } from '../tasks/task/task.interface';

export interface TaskState {
  tasks: ITask[];
  isLoaded: boolean;
}

export const initialStore = (): TaskState => {
  return {
    tasks: [],
    isLoaded: false,
  };
};
