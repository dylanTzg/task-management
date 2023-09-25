import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity,UserEntity]),],
  controllers: [TasksController],
  providers: [TasksService, UserService],
})
export class TasksModule {}
