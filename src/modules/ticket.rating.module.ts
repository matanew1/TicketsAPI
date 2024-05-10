import { Ticket } from './../entities/tickets.entity';
import { TicketRatingController } from './../controllers/tickets.rating.controller';
import { TicketRatingService } from './../services/tickets.rating.service';
import { Module } from '@nestjs/common';
import { TicketRating } from './../entities/ticket_rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, TicketRating])],
  controllers: [TicketRatingController],
  providers: [{
    provide: 'ITicketRatingService',
    useClass: TicketRatingService,
  }],
})

export class TicketRatingModule {}
