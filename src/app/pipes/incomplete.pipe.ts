import { Todo } from 'src/app/models/todo';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incomplete'
})
export class IncompletePipe implements PipeTransform {

  transform(todos: Todo[], showComplete: boolean = false): Todo[] {
    if (showComplete) {
      return todos;
    }
    const incomplete: Todo[] = [];
    for (const todo of todos) {
      if (! todo.completed) {
        incomplete.push(todo);
      }
    }
    return incomplete;
  }

}
