import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  // adding data to database:
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  // getting all tasks from database:
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  //deletinhg a task:
  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}/${task.id}`);
  }

  //updating a task:
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task);
  }
}
