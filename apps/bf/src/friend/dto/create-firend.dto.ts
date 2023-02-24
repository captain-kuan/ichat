import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateFriendDto {
    @IsNumber()
    @IsNotEmpty({ message: "friendId 不能为空" })
    @ApiProperty({ required: true, description: "朋友id" })
    friendId: number

    @IsString({ message: "昵称" })
    nickname?: string
}