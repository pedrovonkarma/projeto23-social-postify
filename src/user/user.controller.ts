import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  
  import { UpdateUserDto } from './dto/update-user.dto';
  import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
  
  @Controller('user')
  export class UsersController {
    constructor(private readonly usersService: UserService) {}
  
    @Post()
    create(@Body() body: CreateUserDto) {
      return this.usersService.create(body);
    }
  
    @Get()
    findAll() {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.usersService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.usersService.remove(+id);
    }
  }