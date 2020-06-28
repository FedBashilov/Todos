import {Todo} from "./todo.model";

export class Project{
  public id: number = null;
  public title: string = '';
  public todos: Todo[] = [];
}
