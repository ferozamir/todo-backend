import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schemas/todo.schemas';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) { }
    async create(title: string): Promise<Todo> {
        return this.todoModel.create({ title });
    }
    async findAll(): Promise<Todo[]> {
        return this.todoModel.find().exec();
    }
    async update(id: string, completed: boolean): Promise<Todo> {
        return this.todoModel.findByIdAndUpdate(id, { completed }, { new: true }).exec();
    }
    async delete(id: string): Promise<Todo> {
        return this.todoModel.findByIdAndDelete(id).exec();
    }

}
