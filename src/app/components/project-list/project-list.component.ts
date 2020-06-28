import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { Project } from '../../models/project.model';
import { Todo } from '../../models/todo.model';
import {plainToClass} from "class-transformer";
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  public allProjects: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllProjects().subscribe( (response: any) => {
      this.allProjects = plainToClass(Project, response.data);
      this.allProjects.forEach(project => {
        project.todos = plainToClass(Todo, project.todos);
      });
    });
  }

  changeTodoCheckedFlag(todo: Todo){
    this.apiService.patchTodo(todo).subscribe( (response: any) => {
      todo.isCompleted = response.data.isCompleted;
    });
  }

}
