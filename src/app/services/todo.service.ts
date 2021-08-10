import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [
    new Todo(1, 'Go round mums', '', false),
    new Todo(2, 'Get Liz back', '', false),
    new Todo(3, 'Sort life out', '', false)
  ];

  constructor() { }

  index(): Todo[] {
    return [...this.todos];
  }

  create(todo: Todo): void {
    todo.id = this.generateId();
    todo.completed = false;
    todo.description = '';
    this.todos.push(todo);
  }

  generateId(): number {
    return this.todos[this.todos.length - 1].id + 1;
  }

  update(todo: Todo): void {
    for (const existingTodo of this.todos) {
      if (existingTodo.id === todo.id) {
        existingTodo.task = todo.task;
        existingTodo.description = todo.description;
        existingTodo.completed = todo.completed;
        break;
      }
    }
  }

  destroy(id: number): void {
    for (let i=0; i< this.todos.length; i++) {
      if (this.todos[i].id === id) {
        this.todos.splice(i,1);
      }
    }
  }

}
