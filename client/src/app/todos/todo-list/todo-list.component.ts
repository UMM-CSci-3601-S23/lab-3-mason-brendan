import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];
  public limit: number;


  public todoBody: string;
  public todoStatus: string;
  public todoOwner: string;
  public todoCategory: string;
  public viewType: 'card' | 'list' = 'card';


  /**
   * This constructor injects both an instance of `UserService`
   * and an instance of `MatSnackBar` into this component.
   *
   * @param todoService the `UserService` used to get users from the server
   * @param snackBar the `MatSnackBar` used to display feedback
   */

  constructor(private todoService: TodoService, private snackBar: MatSnackBar){

  }

  getTodosFromServer() {
    this.todoService.getTodos({
      owner: this.todoOwner
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      console.error('We couldn\'t get the list of todos; the server might be down :(');
      this.snackBar.open(
        'Problem contacting server – try again',
        'OK',
        { duration: 3000 });
    });
  }

  public updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { owner: this.todoOwner,category: this.todoCategory, body: this.todoBody, status: this.todoStatus}
    ).slice(0,this.limit);
  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }
}
