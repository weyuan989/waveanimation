import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

interface User {
  email: string;
  password_hash: string;
  username: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users$: Observable<User[]>;
  getUsersUrl = "http://127.0.0.1:5000";
  postOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    })
  };
  userForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.initializeForm();
    this.get();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      username: "",
      email: "",
      password_hash: ""
    });
  }

  post() {
    return this.http.post<User>(
      this.getUsersUrl + "/register", 
      JSON.stringify(this.userForm.value),
      this.postOptions
    ).subscribe(_ => console.log("success"));
  }

  get() {
    this.users$ = this.http.get<User[]>(this.getUsersUrl + "/users");
  }

  // delete() {
  //   return this.http.delete(
  //     this.getUsersUrl + "/deleteallusers"
  //   ).subscribe(_ => console.log("deleted"));
  // }

  // onDelete() {
  //   this.delete();
  //   this.get();
  // }

  submit() {
    this.post();
    this.get();
  }
}
