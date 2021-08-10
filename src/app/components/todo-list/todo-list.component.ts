import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  title = 'ngTodo';

  todos: Todo[] = [];

  selected: Todo | null = null;
  newTodo: Todo | null = new Todo();
  editTodo: Todo | null = null;

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.todos = this.todoService.index();
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
    this.todoService.create(todo);
    this.todos = this.todoService.index();
    this.newTodo = new Todo();
  }

  setEditTodo(): void {
    this.editTodo = Object.assign({}, this.selected);
  }

  updateTodo(todo: Todo): void {
    this.todoService.update(todo)
    this.todos = this.todoService.index();
    this.editTodo = null;
  }

  deleteTodo(id: number): void {
    this.todoService.destroy(id);
    this.todos = this.todoService.index();
  }
}
