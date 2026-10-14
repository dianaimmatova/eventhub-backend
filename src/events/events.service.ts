import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity.js';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { FindEventDTO } from './dto/find-event.dto.js';
import { Category } from '../categories/category.entity.js';


@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  async create(createEventDto: CreateEventDto, userId: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: createEventDto.categoryId }
    })
    if (!category) {
      throw new NotFoundException('Категория не найдена')
    }
    const event = await this.eventRepository.save({
      ...createEventDto,
      user: { id: userId },
      category,
    });

    return event;
  }

  findAll(findEventDto: FindEventDTO) {
    const where: FindOptionsWhere<Event> = {};

    if (findEventDto.search) {
      where.title = ILike(`%${findEventDto.search}%`);
    }

    if (findEventDto.categoryId) {
      where.category = { id: findEventDto.categoryId }
    }
    return this.eventRepository.find({
      relations: { category: true },
      where,
      order: { date: 'ASC' }
    });
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: { category: true, user: true },
      select: {
        user: { id: true, name: true }
      }
    })
    if (!event) {
      throw new NotFoundException('Мероприятие не найдено')
    }
    return event
  }

  private async findOwnedEvent(id: string, userId: string) {
    const event = await this.eventRepository.findOne({
      where: { id }
    })
    if (!event) {
      throw new NotFoundException('Мероприятие не найдено')
    }
    if (event.userId !== userId) {
      throw new ForbiddenException('Нельзя изменять чужое мероприятие')
    }
    return event
  }

  async update(id: string, updateEventDto: UpdateEventDto, userId: string) {
    const event = await this.findOwnedEvent(id, userId)
    this.eventRepository.merge(event, updateEventDto)

    if (updateEventDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateEventDto.categoryId }
      })
      if (!category) {
        throw new NotFoundException('Категория не найдена')
      }
      event.category = category
    }
    return await this.eventRepository.save(event)
  }

  async remove(id: string, userId: string) {
    const event = await this.findOwnedEvent(id, userId)
    await this.eventRepository.remove(event)
  }


  findMine(userId: string){
    return this.eventRepository.find({
      where: {user: {id: userId}},
      relations: {category: true},
      order: {date: 'ASC'}
    })
  }

}

