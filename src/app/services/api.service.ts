import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';

import { Project } from  './../models/project.model';
import { Todo } from  './../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public API_SERVER = "http://localhost:3000"; //Адрес сервера

  constructor(private httpClient: HttpClient) {}

  //Метод для получения всех projects
  getAllProjects(): Observable<any>{
    return this.httpClient.get<any>(`${this.API_SERVER}/projects`);
  }

  //Метод для создания нового todo
  postTodo(text, proj_id, new_proj_title): Observable<Todo>{
    let requestData: any = {};
    requestData.text = text;
    requestData.isCompleted = false;
    if(new_proj_title){
      requestData.new_proj_title = new_proj_title;
    }
    else{
      requestData.proj_id = proj_id;
    }

    return this.httpClient.post<Todo>(`${this.API_SERVER}/todos`, requestData);
  }


  //Метод для зачеркивания todo (isCompleted = true)
  patchTodo(todo: Todo): Observable<Todo>{
    return this.httpClient.patch<Todo>(`${this.API_SERVER}/projects/${todo.proj_id}/todo/${todo.id}`,
      {isCompleted: !todo.isCompleted});
  }

}
