import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {plainToClass} from "class-transformer";
import { Subscription } from "rxjs";

import { ApiService } from '../../services/api.service';
import { ProjectsService } from '../../services/projects.service';

import { Project } from '../../models/project.model';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.css']
})
export class AddTodoDialogComponent implements OnInit, OnDestroy {
  public addTodoForm: FormGroup;

  private subscriptionAllProjects: Subscription;
  public allProjects: Project[] = [];

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddTodoDialogComponent>,
    private projectsService: ProjectsService) {
      this.subscriptionAllProjects = this.projectsService.allProjectsObs.subscribe(projects => {
        this.allProjects = projects;
      });
    }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(){
    //Отписка от отслеживания
    this.subscriptionAllProjects.unsubscribe();
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
       this.apiService.getAllProjects().subscribe( (response: any) => {
         let projects: any;
         projects = plainToClass(Project, response.data);
         projects.forEach(project => {
           project.todos = plainToClass(Todo, project.todos);
         });
         this.projectsService.setAllProjects(projects);
       });
       this.dialogRef.close();
   });
  }
}
