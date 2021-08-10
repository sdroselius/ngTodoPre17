import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  title = 'ngTodo';

  todos: Todo[] = [
    new Todo(1, 'Go round mums', '', false),
    new Todo(2, 'Get Liz back', '', false),
    new Todo(3, 'Sort life out', '', false)
  ];

  selected: Todo | null = null;
  newTodo: Todo | null = new Todo();
  editTodo: Todo | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  getTodoCount(): number {
    return this.todos.length;
  }

  displayTodo(todo: Todo): void {
    this.selected = todo;
  }

  displayTable(): void {
    this.selected = null;
  }

  addTodo(todo: Todo) {
    todo.id = this.generateId();
    todo.completed = false;
    todo.description = '';
    this.todos.push(todo);
    this.newTodo = new Todo();
  }

  generateId(): number {
    return this.todos[this.todos.length - 1].id + 1;
  }

  setEditTodo(): void {
    this.editTodo = Object.assign({}, this.selected);
  }

  updateTodo(todo: Todo): void {
    for (const existingTodo of this.todos) {
      if (existingTodo.id === todo.id) {
        existingTodo.task = todo.task;
        existingTodo.description = todo.description;
        existingTodo.completed = todo.completed;
        break;
      }
    }
    this.editTodo = null;
  }
}
