import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task} from "./task.model";
import {CreateTaskDto} from "./dto/create-task.dto";

@Controller('tasks')
export class TasksController {
    constructor(readonly tasksService: TasksService) {
    }


    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDto : CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }
    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        this.tasksService.deleteTaskById(id);
    }
}
