import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RegistrationsService } from './registrations.service.js';
import { CreateRegistrationDto } from './dto/create-registration.dto.js';
import { UpdateRegistrationDto } from './dto/update-registration.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ApiBearerAuth } from '@nestjs/swagger';



@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createRegistrationDto: CreateRegistrationDto,
    @Req() request: { user: {id: string} }
  ) {
    return this.registrationsService.create(createRegistrationDto, request.user.id);
  }


  @ApiBearerAuth()
  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMine(@Req() request: {user: {id: string}}) {
    return this.registrationsService.findMine(request.user.id)
  }

}
