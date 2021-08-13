import { IncompletePipe } from './../../pipes/incomplete.pipe';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  title = 'ngTodo';

  todos: Todo[] = [];

  selected: Todo | null = null;
  newTodo: Todo | null = new Todo();
  editTodo: Todo | null = null;
  showComplete: boolean = false;

  constructor(
    private todoService: TodoService,
    private incompletePipe: IncompletePipe,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let idString = this.currentRoute.snapshot.paramMap.get('id');

    if (!this.selected && idString) {
      this.todoService.show(idString).subscribe(
        todo => {
          this.selected = todo;
        },
        fail => {
          console.error('Invalid todo ID ' + idString);
          this.router.navigateByUrl('notFound');
        }
      );
    }
    this.reload();
  }

  reload() {
    this.todoService.index().subscribe(
      (todos) => {
        this.todos = todos;
      },
      (err) => {
        console.error('TodoListComponent.reload(): error retrieving todos');
        console.error(err);
      }
    );
  }
  getTodoCount(): number {
    return this.incompletePipe.transform(this.todos, false).length;
  }

  displayTodo(todo: Todo): void {
    this.selected = todo;
  }

  displayTable(): void {
    this.selected = null;
  }

  addTodo(todo: Todo) {
    this.todoService.create(todo).subscribe(
      (todo) => {
        this.reload();
        this.newTodo = new Todo();
      },
      (err) => {
        console.error('TodoListComponent.addTodo(): error adding todo');
        console.error(err);
      }
    );
  }

  setEditTodo(): void {
    this.editTodo = Object.assign({}, this.selected);
  }

  updateTodo(todo: Todo, setSelected = true): void {
    this.todoService.update(todo).subscribe(
      (todo) => {
        this.reload();
        this.editTodo = null;
        if (setSelected) {
          this.selected = todo;
        }
      },
      (bad) => {
        console.error('TodoListComponent.updateTodo(): error updating todo');
        console.error(bad);
      }
    );
  }

  deleteTodo(id: number): void {
    this.todoService.destroy(id).subscribe(
      (good) => {
        this.reload();
      },
      (bad) => {
        console.error('TodoListComponent.deleteTodo(): error deleting todo');
        console.error(bad);
      }
    );
  }
}
