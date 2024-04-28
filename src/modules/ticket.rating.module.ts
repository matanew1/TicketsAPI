import { TicketRatingController } from './../controllers/tickets.rating.controller';
import { TicketRating } from './../entities/ticket_rating.entity';
import { TicketRatingService } from './../services/tickets.rating.service';
import { Module } from '@nestjs/common';
import { Ticket } from './../entities/tickets.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TicketRating, Ticket])],
  controllers: [TicketRatingController],
  providers: [TicketRatingService],
})

export class TicketRatingModule {}
