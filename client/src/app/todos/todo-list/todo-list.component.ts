import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];

  public todoID: string;
  public todoBody: string;
  public todoStatus: string;
  public todoOwner: string;
  public todoCategory: string;
  public viewType: 'card' | 'list' = 'card';
}
