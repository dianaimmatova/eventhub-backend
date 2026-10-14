import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RegistrationsService } from './registrations.service.js';
import { CreateRegistrationDto } from './dto/create-registration.dto.js';
import { UpdateRegistrationDto } from './dto/update-registration.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';


@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createRegistrationDto: CreateRegistrationDto,
    @Req() request: { user: {id: string} }
  ) {
    return this.registrationsService.create(createRegistrationDto, request.user.id);
  }

  @Get()
  findAll() {
    return this.registrationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistrationDto: UpdateRegistrationDto) {
    return this.registrationsService.update(+id, updateRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationsService.remove(+id);
  }
}
