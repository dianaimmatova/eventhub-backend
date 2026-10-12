import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity.js';
import { Repository } from 'typeorm';


@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ){}

  async create(createEventDto: CreateEventDto, userId: string ) {
    const event = await this.eventRepository.save({
    ...createEventDto,
    user: { id: userId },
    category: { id: createEventDto.categoryId},
  });
    return event;
  }

  findAll() {
    return this.eventRepository.find({
      relations: {category: true,}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
