import { TicketRatingModule } from './ticket.rating.module';
import { TicketRating } from './../entities/ticket_rating.entity';
import { Ticket } from './../entities/tickets.entity'
import { TicketModule } from './ticket.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      entities: [Ticket, TicketRating],
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
    }),
    TicketModule,
    TicketRatingModule,
  ],
})
export class AppModule {}
