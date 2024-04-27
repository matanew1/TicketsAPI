import { Ticket } from './../entities/tickets.entity'
import { TicketModule } from './ticket.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      entities: [Ticket],
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
    }),
    TicketModule,
  ],
})
export class AppModule {}
