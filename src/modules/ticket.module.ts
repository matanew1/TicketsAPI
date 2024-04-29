import { TicketRating } from './../entities/ticket_rating.entity';
import { TicketService } from './../services/tickets.service';
import { TicketController } from './../controllers/tickets.controller';
import { Ticket } from './../entities/tickets.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Ticket, TicketRating])],
    providers: [
        {
            provide: 'ITicketService',
            useClass: TicketService,
        },
    ],
    controllers: [TicketController],
})
export class TicketModule {}