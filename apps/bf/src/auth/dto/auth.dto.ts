import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsString({ message: "账号需为字符串" })
    @IsNotEmpty({ message: "账号不能为空" })
    account: string
    @IsString({ message: "密码需为字符串" })
    @IsNotEmpty({ message: "密码不能为空" })
    password: string
}

export class LoginDto {
    @IsString({ message: "账号需为字符串" })
    @IsNotEmpty({ message: "账号不能为空" })
    @ApiProperty({ description: "账号", example: 'admin' })
    account: string
    @IsString({ message: "密码需为字符串" })
    @IsNotEmpty({ message: "密码不能为空" })
    @ApiProperty({ description: "密码", example: '123456' })
    password: string
}