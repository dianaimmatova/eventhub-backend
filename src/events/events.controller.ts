import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ParseUUIDPipe } from '@nestjs/common';
import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { FindEventDTO } from './dto/find-event.dto.js';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createEventDto: CreateEventDto,
    @Req() request: {user: {id: string, email: string}}
  ) {
    return this.eventsService.create(createEventDto, request.user.id);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
