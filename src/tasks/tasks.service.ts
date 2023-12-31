import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly userService: UserService) { }

  async getAllTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    console.log(task);
    return this.taskRepository.save({
      ...task,
    });
  }

  // async getTasksByUserId(userId: string): Promise<Task[]> {
  //   return this.taskRepository.find({ where: { user: { id: userId } } });
  // }


  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.getTaskById(id);
    await this.taskRepository.delete(task);
  }
}
