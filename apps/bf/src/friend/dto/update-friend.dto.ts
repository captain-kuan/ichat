import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateFriendDto {
  @IsString({ message: '昵称' })
  @ApiProperty({ description: '昵称' })
  nickname?: string;
}
