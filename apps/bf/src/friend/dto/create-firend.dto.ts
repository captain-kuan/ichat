import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class AgreeFriendDto {
  @IsString()
  @IsNotEmpty({ message: 'friendId 不能为空' })
  @ApiProperty({ required: true, description: '朋友id' })
  friendId: string;

  nickname?: string;
}

export class SendAddFriendDto {
  @IsString()
  @IsNotEmpty({ message: 'friendId 不能为空' })
  @ApiProperty({ required: true, description: '朋友id' })
  friendId: string;
}
