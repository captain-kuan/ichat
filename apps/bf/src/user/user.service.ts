import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from '@/auth/dto/auth.dto';
import { Repository } from 'typeorm';
import { User } from '@/user/entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  findById(id: number) {
    if (id == null) return null
    return this.usersRepository.findOneBy({ UId: id })
  }
  changeUser(id,{Uname}:Partial<User>){
    this.usersRepository.update(id, {Uname})
  }
  findOne(account: string): Promise<User> {
    return this.usersRepository.findOneBy({ UAccount: account });
  }
  create({ account, password }: RegisterDto) {
    const user = this.usersRepository.create({ UAccount: account, UPassword: password })
    return this.usersRepository.save(user)
  }
}
