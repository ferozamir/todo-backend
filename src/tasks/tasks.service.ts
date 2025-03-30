import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(title: string, userId: string): Promise<Task> {
    const task = new this.taskModel({ title, createdBy: userId });
    return task.save();
  }

  async getAllTasks(userId: string): Promise<Task[]> {
    return this.taskModel.find({ createdBy: userId }).populate('createdBy completedBy').exec();
  }

  async markTaskCompleted(taskId: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findById(taskId);
    if (!task) throw new NotFoundException('Task not found');

    if (task.completedBy) throw new ForbiddenException('Task is already completed');

    task.completed = true;
    task.completedBy = userId;
    return task.save();
  }

  async deleteTask(taskId: string, userId: string): Promise<void> {
    const task = await this.taskModel.findById(taskId);
    if (!task) throw new NotFoundException('Task not found');

    if (task.createdBy.toString() !== userId) {
      throw new ForbiddenException('You can only delete your own tasks');
    }

    await this.taskModel.findByIdAndDelete(taskId);
  }
}
