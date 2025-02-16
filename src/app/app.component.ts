import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TodoItem} from '../model/TodoItem';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgClass, NgForOf} from '@angular/common';
import {TodoListService} from '../service/todo-list.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgForOf, NgClass, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  todoList$: Observable<TodoItem[]>;
  newTask: string = '';

  constructor(private todoListService: TodoListService) {
    this.todoList$ = this.todoListService.getTodoList();
  }

  addTask(): void {
    if (this.newTask.trim()) {
      this.todoListService.addTask(this.newTask.trim())
    }
  }

  toggleComplete(index: number): void {
    this.todoListService.toggleComplete(index)
  }

  deleteTask(id: number): void {
    this.todoListService.deleteTask(id);
  }
}
