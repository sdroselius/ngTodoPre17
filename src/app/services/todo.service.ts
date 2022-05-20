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

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  index(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(
      catchError((err: any) => {
        console.error('TodoService.index(): error retrieving todo list');
        return throwError(
          () =>
            new Error('TodoService.index(): error retrieving todo list: ' + err)
        );
      })
    );
  }

  show(todoId: any): Observable<Todo> {
    return this.http.get<Todo>(`${this.url}/${todoId}`).pipe(
      catchError((err: any) => {
        console.error('TodoService.show(): error retrieving todo id ' + todoId);
        return throwError(
          () => new Error('TodoService.show(): error retrieving todo: ' + err)
        );
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
        return throwError(
          () => new Error('TodoService.create(): error creating todo: ' + err)
        );
      })
    );
  }

  update(todo: Todo): Observable<Todo> {
    if (todo.completed) {
      todo.completeDate = this.datePipe.transform(Date.now(), 'shortDate');
    } else {
      todo.completeDate = '';
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .put<Todo>(`${this.url}/${todo.id}`, todo, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.error('TodoService.update(): error updating todo');
          return throwError(
            () => new Error('TodoService.update(): error updating todo: ' + err)
          );
        })
      );
  }

  destroy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.error('TodoService.destroy(): error deleting todo');
        return throwError(
          () => new Error('TodoService.destroy(): error deleting todo: ' + err)
        );
      })
    );
  }
}
