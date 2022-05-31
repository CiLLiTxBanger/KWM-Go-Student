import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import jwtDecode from "jwt-decode";

interface Token {
  exp: number,
  user: {
    id: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api:string = "http://kwmgostudent.s1910456007.student.kwmhgb.at/api/auth";

  constructor(private http:HttpClient) { }

  login(email:string, password:string) {
    let json = {"email": email, "password":password}
    return this.http.post(`${this.api}/login`, json);
  }

  public setSessionStorage(token:string) {
    console.log(jwtDecode(token));
    const decodedToken = jwtDecode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    console.log("logged out");
  }

  public isLoggedIn() {
    if(sessionStorage.getItem("token")){
      let token:string = <string>sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCDate(decodedToken.exp);
      if(expirationDate < new Date()) {
        console.log("token expired");
        sessionStorage.removeItem("token");
        return false;
      }
      else {
        return true;
      }
    }
    return false;
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
