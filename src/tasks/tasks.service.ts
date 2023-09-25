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
    private readonly userService: UserService  ) {}

   async getAllTasks(userId: string): Promise<TaskEntity[]> {
    return this.taskRepository.find({ where: { user: { id: userId } } });
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({where: {id}});

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async createTask(userId: string, task: CreateTaskDto): Promise<Task> {
    const taskUser = await this.userService.getById(userId);
    if (!taskUser) {
      throw new Error('Utilisateur non trouvé');
    }
  
    return this.taskRepository.save({
      ...task,
      user: taskUser, 
    });
  }
  

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
