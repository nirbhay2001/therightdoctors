import { HttpClient } from '@angular/common/http';
import { inject, Injectable, model } from '@angular/core';
import User from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = "http://localhost:5000"
  // apiURL = "https://therightdoctors.onrender.com"
  httpClient = inject(HttpClient)
  constructor() { }
  getUsers(){
    return this.httpClient.get<User[]>(this.apiURL+'/person')
  }
  getUser(id:string){
    return this.httpClient.get<User[]>(this.apiURL+'/person/'+id)
  }  
  addUser(model:User){
    return this.httpClient.post(this.apiURL+'/person',model)
  }
  updateUser(id:string, model:User){
    return this.httpClient.put(this.apiURL+'/person/'+id, model)
  }  
  deleteUser(id: string) {
    return this.httpClient.delete(this.apiURL+'/person/'+id);
  }
}
