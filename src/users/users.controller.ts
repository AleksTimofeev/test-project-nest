import { Body, Controller, Get, Param, Post, Put, Query, Req, Request } from "@nestjs/common";
import { UsersService } from "./users.service";

export interface Query{
  name: string
  max_age: number
  min_age: number
}
export interface BodyAddUser {
  name: string
  age: number
}
export interface BodyUpdateUser extends BodyAddUser{
  id: string
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() query: Query) {
    if(query.name){
      return this.usersService.getUser(query.name)
    }if(query.min_age && query.max_age){
      const users = this.usersService.getUsersInAge({minAge: query.min_age, maxAge: query.max_age})
      return users ? users : 'not found'
    }
    return this.usersService.getUsers();
  }
  @Get(':id')
  getUserById(@Param() params, @Req() req: Request){
    if(params.id){
      return this.usersService.getUserById(params.id)
    }
  }
  @Post()
  addUser(@Body() body: BodyAddUser){
    return this.usersService.addUser(body.name, body.age)
  }
  @Put()
  updateUser(@Body() body: BodyUpdateUser){
    return this.usersService.updateUser(body) ? 'ok' : 'error'
  }
}
