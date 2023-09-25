
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { firstName, lastName } = createUserDto;
    const user = this.userRepository.create({ firstName, lastName });
    return await this.userRepository.save(user);
  }

  async getById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({where: {id}});
  }
  
}
