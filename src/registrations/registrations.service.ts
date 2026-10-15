import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto.js';
import { UpdateRegistrationDto } from './dto/update-registration.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './registration.entity.js';
import { Repository } from 'typeorm';
import { Event } from '../events/event.entity.js';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ) { }

  async create(createRegistrationDto: CreateRegistrationDto, userId: string) {
    const event = await this.eventRepository.findOne({
      where: {id: createRegistrationDto.eventId}
    })
    if(!event) {
      throw new NotFoundException("Мероприятие не найдено")
    }

    const registered = await this.registrationRepository.count({
      where: {event: {id: event.id}}
    })
    if (registered >= event.capacity) {
      throw new ConflictException('Мест не осталось')
    }

    const existing = await this.registrationRepository.findOne({
      where: {user: {id: userId}, event: {id: event.id}}
    })
    if (existing) {
      throw new ConflictException('Вы уже записаны')
    }

    return await this.registrationRepository.save({
      user: {id: userId},
      event: {id: event.id}
    })
    
  }

  async findMine(userId: string) {
    const registrations = await this.registrationRepository.find({
      where: {user: {id: userId}},
      relations: {event: {category: true}}
    })

    return registrations.map((registrations) => registrations.event)
  }

}
