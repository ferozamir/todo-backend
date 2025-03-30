import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {

    constructor(private readonly todoService: TodoService) { }

    @Post()
    async create(@Body('title') title: string) {
        return this.todoService.create(title);
    }

    @Get()
    async findAll() {
        return this.todoService.findAll();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body('completed') completed: boolean) {
        return this.todoService.update(id, completed);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.todoService.delete(id);
    }
}
