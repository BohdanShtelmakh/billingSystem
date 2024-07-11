import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../role/role.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userDto: User) {
    return this.usersService.create(userDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin', 'Client')
  findOne(@Param('id') id: string, @Req() req) {
    if (req.user.role !== 'Admin' && req.user.id !== +id) {
      throw new UnauthorizedException();
    }
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin', 'Client')
  update(@Param('id') id: string, @Body() userDto: User, @Req() req) {
    if (req.user.role !== 'Admin' && req.user.id !== +id) {
      throw new UnauthorizedException();
    }
    return this.usersService.update(+id, userDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
