import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoItem } from '../model/TodoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todoListSubject = new BehaviorSubject<TodoItem[]>([]);
  private todoList$ = this.todoListSubject.asObservable();

  getTodoList(): Observable<TodoItem[]> {
    return this.todoList$;
  }

  addTask(newTask: string): void {
    const currentList = this.todoListSubject.value;
    this.todoListSubject.next([...currentList, { id: Date.now(), task: newTask.trim(), completed: false }]);
  }

  toggleComplete(index: number): void {
    const updatedList = [...this.todoListSubject.value];
    if (updatedList[index]) {
      updatedList[index] = { ...updatedList[index], completed: !updatedList[index].completed };
      this.todoListSubject.next(updatedList);
    }
  }

  deleteTask(id: number): void {
    this.todoListSubject.next(
      this.todoListSubject.value.filter(item => item.id !== id)
    );
  }
}
