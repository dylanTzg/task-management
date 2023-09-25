import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task,TaskStatus } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':userId')
  getAllTasks(@Param('userId') userId): Promise<Task[]> {
    return this.tasksService.getAllTasks(userId);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post(':userId')
  createTask(@Body() task: Task, @Param('userId') userId): Promise<Task> {
    return this.tasksService.createTask(userId,task);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status as TaskStatus);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
