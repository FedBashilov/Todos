import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

import { ApiService } from '../../services/api.service';
import { Project } from '../../models/project.model';
import { Todo } from '../../models/todo.model';
import {plainToClass} from "class-transformer";
@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.css']
})
export class AddTodoDialogComponent implements OnInit {
  public addTodoForm: FormGroup;
  public allProjects: any;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddTodoDialogComponent>) { }

  ngOnInit(): void {
    this.initForm();
    this.apiService.getAllProjects().subscribe( (response: any) => {
      this.allProjects = plainToClass(Project, response.data);
      this.allProjects.forEach(project => {
        project.todos = plainToClass(Todo, project.todos);
      });
    });

  }

  initForm(){
   this.addTodoForm  = this.fb.group({
     text: ['', [
       Validators.required,
      ]
     ],
     proj_id: ['', [
       Validators.required,
      ]
    ],
     new_proj_title: []
    });
  }

  onChanges() {
    this.addTodoForm.get('proj_id').valueChanges.subscribe(val => {
      const new_proj_title = this.addTodoForm.get('new_proj_title');
      if (val == -1) {
        new_proj_title.setValidators(Validators.required);
        new_proj_title.updateValueAndValidity();
      }
      else {
        new_proj_title.setValidators(null);
        new_proj_title.updateValueAndValidity();
      }
    });
  }

  onSubmit() {
   const controls = this.addTodoForm.controls;

   if (this.addTodoForm.invalid) {
    Object.keys(controls)
     .forEach(controlName => controls[controlName].markAsTouched());
     return;
    }
   this.apiService.postTodo(
     this.addTodoForm.value.text,
     this.addTodoForm.value.proj_id,
     this.addTodoForm.value.new_proj_title).subscribe( (response: any) => {
      this.dialogRef.close();
   });
  }
}
