import { Controller, Post, Get, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
// @UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post('create')
  async createTask(@Body('title') title: string, @Req() req) {
    console.log('user: ', req.user)
    return this.tasksService.createTask(title, req.user.userId);
  }

  @Get()
  async getAllTasks(@Req() req) {
    return this.tasksService.getAllTasks(req.user.userId);
  }

  @Post(':taskId/complete')
  async markTaskCompleted(@Param('taskId') taskId: string, @Req() req) {
    return this.tasksService.markTaskCompleted(taskId, req.user.userId);
  }

  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: string, @Req() req) {
    return this.tasksService.deleteTask(taskId, req.user.userId);
  }
}
