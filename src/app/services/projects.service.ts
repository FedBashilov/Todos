import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private allProjectsSubject = new BehaviorSubject<Project[]>( [] );
  public allProjectsObs = this.allProjectsSubject.asObservable();
  public allProjects: Project[] = [];

  constructor() { }

  setAllProjects(projects: Project[]){
    this.allProjectsSubject.next(projects);
  }
}
