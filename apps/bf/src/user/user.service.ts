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
  ) {}
  findById(id: number) {
    if (id == null) return null;
    return this.usersRepository.findOneBy({ id });
  }
  changeUser(id, { name }: Partial<User>) {
    this.usersRepository.update(id, { name });
  }
  findOne(account: string): Promise<User> {
    return this.usersRepository.findOneBy({ account });
  }
  create({ account, password }: RegisterDto) {
    const user = this.usersRepository.create({
      account,
      password,
    });
    return this.usersRepository.save(user);
  }
}
