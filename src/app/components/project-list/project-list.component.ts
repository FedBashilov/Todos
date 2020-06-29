import { Component, OnInit, OnDestroy } from '@angular/core';
import {plainToClass} from "class-transformer";
import { Subscription } from "rxjs";

import { ApiService } from '../../services/api.service';
import { ProjectsService } from '../../services/projects.service';

import { Project } from '../../models/project.model';
import { Todo } from '../../models/todo.model';



@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  private subscriptionAllProjects: Subscription;
  public allProjects: Project[] = [];

  constructor(private apiService: ApiService, private projectsService: ProjectsService) {
    this.subscriptionAllProjects = this.projectsService.allProjectsObs.subscribe(projects => {
      this.allProjects = projects;
    });
  }

  ngOnInit(): void {
    this.apiService.getAllProjects().subscribe( (response: any) => {
      let projects: any;
      projects = plainToClass(Project, response.data);
      projects.forEach(project => {
        project.todos = plainToClass(Todo, project.todos);
      });
      this.projectsService.setAllProjects(projects);
    });
  }

  ngOnDestroy(){
    //Отписка от отслеживания
    this.subscriptionAllProjects.unsubscribe();
  }

  changeTodoCheckedFlag(todo: Todo){
    this.apiService.patchTodo(todo).subscribe( (response: any) => {
      todo.isCompleted = response.data.isCompleted;
    });
  }

}
