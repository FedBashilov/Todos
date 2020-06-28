import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddTodoDialogComponent } from "../add-todo-dialog/add-todo-dialog.component";
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }


  openDialog(){
    const dialogRef = this.dialog.open(AddTodoDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
