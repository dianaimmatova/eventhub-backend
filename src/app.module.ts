import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './config/db.config.js';
import { UserModule } from './users/user.module.js';
import { CategoryModule } from './categories/category.module.js';
import { EventsModule } from './events/events.module.js';
import { RegistrationsModule } from './registrations/registrations.module.js';
import { AuthenticationModule } from '@nestjs/authentication';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig
    }), 
    AuthenticationModule.forRoot({
      session: {
        absoluteTtl: '14d',
        idleTtl: '3d'
      }
    }),
    UserModule, CategoryModule, EventsModule, RegistrationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
