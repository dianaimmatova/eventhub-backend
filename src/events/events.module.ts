import { Module } from '@nestjs/common';
import { EventsService } from './events.service.js';
import { EventsController } from './events.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity.js';
import { Category } from '../categories/category.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Category])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
