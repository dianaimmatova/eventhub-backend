import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service.js';
import { RegistrationsController } from './registrations.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './registration.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Registration])],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}
