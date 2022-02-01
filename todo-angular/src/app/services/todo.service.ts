import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {
    this.todos = [
      {
        id: '1',
        title: 'Todo 1',
        isCompleted: false,
        date: new Date(),
      },
      {
        id: '2',
        title: 'Todo 2',
        isCompleted: false,
        date: new Date(),
      },
      {
        id: '3',
        title: 'Todo 3',
        isCompleted: false,
        date: new Date(),
      },
      {
        id: '4',
        title: 'Todo 4',
        isCompleted: true,
        date: new Date(),
      },
    ];
  }
  todos: Todo[];

  getTodos = () => {
    return of(this.todos);
  };

  addTodo = (todo: Todo) => {
    this.todos.push(todo);
  };

  changeStatus = (todo: Todo) => {
    this.todos?.map((singleTodo) => {
      if (singleTodo.id == todo.id) {
        singleTodo.isCompleted = !singleTodo.isCompleted;
      }
    });
  };

  deleteTodo = (todo: Todo) => {
    this.todos?.map((singleTodo, index) => {
      if (singleTodo.id == todo.id) {
        this.todos.splice(index, 1);
      }
    });
  };
}
