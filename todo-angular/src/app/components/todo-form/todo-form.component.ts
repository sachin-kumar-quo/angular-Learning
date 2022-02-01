import { Component, OnInit } from '@angular/core';

import { Todo } from '../../model/todo';
import { v4 as uuid, v4 } from 'uuid';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  todoTitle: string = '';
  ngOnInit(): void {}

  handleAddTodo = () => {
    const newTodo: Todo = {
      id: v4(),
      title: this.todoTitle,
      isCompleted: false,
      date: new Date(),
    };
    this.todoService.addTodo(newTodo);
    this.todoTitle = '';
  };
}
