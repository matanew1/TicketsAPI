import { Ticket } from './../entities/tickets.entity';
import { TicketController } from './../controllers/tickets.controller';
import { TicketService } from './../services/tickets.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}