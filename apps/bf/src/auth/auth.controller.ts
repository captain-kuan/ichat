import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@/common/current-user/SetMetadata';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { CurrentUser } from '@/common/current-user/current-user.decorator';
@Controller('auth')
@ApiTags('权限')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: '登录', description: '返回token' })
  @ApiResponse({
    status: 200,
    description: JSON.stringify({ code: 0, data: { token: '123' } }),
  })
  async login(
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    params: LoginDto,
    @Req() req,
  ) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() params: RegisterDto) {
    return this.authService.register(params);
  }
  @Get('info')
  getInfo(@CurrentUser('Uid') userId: number) {
    return this.authService.getUser(userId);
  }
}
