import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ParseUUIDPipe } from '@nestjs/common';
import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { FindEventDTO } from './dto/find-event.dto.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createEventDto: CreateEventDto,
    @Req() request: { user: { id: string, email: string } }
  ) {
    return this.eventsService.create(createEventDto, request.user.id);
  }
  

  @ApiBearerAuth()
  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMine(@Req() request: {user: {id: string}}) {
    return this.eventsService.findMine(request.user.id)
  }

  @Get()
  findAll(
    @Query() findEventDto: FindEventDTO
  ) {
    return this.eventsService.findAll(findEventDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Req() request: { user: { id: string } }) {
    return this.eventsService.update(id, updateEventDto, request.user.id);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string,
    @Req() request: { user: { id: string } }
  ) {
    return this.eventsService.remove(id, request.user.id);
  }
}
