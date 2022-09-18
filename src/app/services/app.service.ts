import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '@app/interfaces/task.interface';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all Tasks
   * @returns {Observable<ITask[]>}
   */
  public getAllTasks(): Observable<ITask[]> {
    const url = `${this.baseUrl}/task`;

    return this.http.get<ITask[]>(url);
  }

  /**
   * Add new Task
   * @param {string} title
   * @param {string} description
   * @returns {Observable<ITask>}
   */
  public createTask(title: string, description: string): Observable<ITask> {
    const url = `${this.baseUrl}/task`;
    const body = { title, description };

    return this.http.post<ITask>(url, body);
  }

  public deleteTask(title: string): Observable<ITask> {
    const url = `${this.baseUrl}/task/${title}`;

    return this.http.delete<ITask>(url);
  }

  public updateTask(updateTask: ITask): Observable<ITask> {
    const { slug, ...rest } = updateTask;
    const url = `${this.baseUrl}/task/${slug}`;
    const body = { ...rest };

    return this.http.put<ITask>(url, body);
  }
}
