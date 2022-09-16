import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '@tasks/task/task.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

  public updateTask(title: string, description: string): Observable<ITask> {
    const url = `${this.baseUrl}/task/${title}`;
    const body = { title, description };

    return this.http.put<ITask>(url, body);
  }
}
