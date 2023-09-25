import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';


@Module({
  imports: [TasksModule, UserModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'projet',
    database: 'projet',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, 
  })],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
} 