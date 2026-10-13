import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity.js';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { FindEventDTO } from './dto/find-event.dto.js';


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

  findAll(findEventDto: FindEventDTO) {
    const where: FindOptionsWhere<Event> = {};

    if (findEventDto.search) {
      where.title = ILike(`%${findEventDto.search}%`);
    }

    if (findEventDto.categoryId) {
      where.category = {id: findEventDto.categoryId}
    }
    return this.eventRepository.find({
      relations: {category: true},
      where,
      order: {date: 'ASC'}
    });
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: {category: true}
    })
    if(!event) {
      throw new NotFoundException('Мероприятие не найдено')
    }
    return event
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
