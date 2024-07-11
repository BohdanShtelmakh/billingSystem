import { Controller, Post, Body, Req, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: User) {
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: User, @Res() res: Response) {
    const { access_token } = await this.authService.login(userDto);
    res.cookie('access_token', access_token, { httpOnly: true });
    res.send({ access_token });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.send({ message: 'Logged out' });
  }
}
