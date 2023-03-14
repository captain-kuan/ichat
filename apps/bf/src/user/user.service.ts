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
    if (id == null) return null;
    return this.usersRepository.findOneBy({ id });
  }
  changeUser(id, { name, avatar }: Partial<User>) {
    this.usersRepository.update(id, { name, avatar });
  }
  findOne(account: string): Promise<User> {
    return this.usersRepository.findOneBy({ account });
  }
  findByName(account: string): Promise<User[]> {
    return this.usersRepository.find({ where: { account }, select: ['id', "account", "avatar"] });
  }
  create({ account, password }: RegisterDto) {
    const user = this.usersRepository.create({
      account,
      password,
    });
    return this.usersRepository.save(user);
  }
}
