import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'http://localhost:8084/';
  private url = this.baseUrl + 'api/todos';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe) {}

  index(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(
      catchError((err: any) => {
        console.error('TodoService.index(): error retrieving todo list');
        return throwError(err);
      })
    );
  }

  create(todo: Todo): Observable<Todo> {
    todo.completed = false;
    todo.description = '';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Todo>(this.url, todo, httpOptions).pipe(
      catchError((err: any) => {
        console.error('TodoService.create(): error creating todo');
        return throwError(err);
      })
    );
  }

  update(todo: Todo): Observable<Todo> {
    if (todo.completed) {
      todo.completeDate = this.datePipe.transform(Date.now(), 'shortDate');
    }
    else {
      todo.completeDate = '';
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Todo>(`${this.url}/${todo.id}`, todo, httpOptions).pipe(
      catchError((err: any) => {
        console.error('TodoService.update(): error updating todo');
        return throwError(err);
      })
    );
  }

  destroy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.error('TodoService.destroy(): error deleting todo');
        return throwError(err);
      })
    );

  }
}
