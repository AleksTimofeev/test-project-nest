import { Injectable } from "@nestjs/common";
import { BodyUpdateUser } from "./users.controller";
import { STATUS_CODES } from "http";

export interface User {
  name: string
  age: number
  id: string
}

@Injectable()
export class UsersService {

   users: User[] = [
    { name: "Aleks", age: 34, id: '1' },
    { name: "Olga", age: 36, id: '2' },
    { name: "Sofia", age: 9, id: '3' },
    { name: "Vovka", age: 1, id: '4' }
  ]

  // data: User[] = [
  //   { name: "Aleks", age: 34, id: '1' },
  //   { name: "Olga", age: 36, id: '2' },
  //   { name: "Sofia", age: 9, id: '3' },
  //   { name: "Vovka", age: 1, id: '4' }
  // ];

  getUsers(): User[] | null {
    return this.users;
  }
  getUser(name: string){
    return this.users.filter(u => (u.name.toLowerCase()) === (name.toLowerCase()))
  }
  getUsersInAge(params: { minAge: number, maxAge: number }){
    const filteredUsers = this.users.filter(u => u.age >= params.minAge && u.age <= params.maxAge)
    if(filteredUsers){
      return filteredUsers
    }else{return undefined}
  }
  getUserById(id: string) {
    return this.users.find(u => u.id === id)
  }
  addUser(name: string, age: number) {
    this.users.push({name, age, id: '5'})
    return this.users
  }
  updateUser(body: BodyUpdateUser) {
    debugger
    this.users = this.users.map(u => u.id === body.id ? {...u, ...body}: {...u})
    debugger
    return true
  }
}
