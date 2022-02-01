import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../model/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  faTrashAlt = faTrashAlt;
  todos: Todo[] = [];

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  changeTodoStatus = (todo: Todo) => {
    this.todoService.changeStatus(todo);
  };

  deleteTodo = (todo: Todo) => {
    this.todoService.deleteTodo(todo);
  };
}
