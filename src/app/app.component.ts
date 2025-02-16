import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {
  todoList: TodoItem[] = [];
  newTask: string = '';
  intervalId: any;

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.fetchTodoList();
    this.intervalId = setInterval(() => {
      this.fetchTodoList();
    }, 5000);
  }

  fetchTodoList(): void {
    this.todoListService.getTodoList().subscribe((todos) => {
      this.todoList = todos;
    });
  }

  addTask(): void {
    if (this.newTask.trim()) {
      this.todoListService.addTask(this.newTask.trim())
      this.fetchTodoList();
    }
  }

  toggleComplete(index: number): void {
    this.todoListService.toggleComplete(index)
  }

  deleteTask(id: number): void {
    this.todoListService.deleteTask(id);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
