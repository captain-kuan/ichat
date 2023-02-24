import { IsString, IsNumber } from 'class-validator';

export class CreateMessageDto {
    @IsNumber()
    toId: number
    @IsString()
    message: string
    @IsNumber()
    type: number
}
