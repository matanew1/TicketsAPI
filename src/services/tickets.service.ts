import { Ticket } from './../entities/tickets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketDto } from './../dto/ticket.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  getTickets(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  getTicketsByQuery(query: any): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: query });
  }

  createTicket(ticketDto: TicketDto): Promise<Ticket> {
    const ticket: Ticket = new Ticket();
    ticket.title = ticketDto.title;
    ticket.description = ticketDto.description;
    ticket.price = ticketDto.price;
    return this.ticketRepository.save(ticket);
  }

  updateTicket(id: string, ticketDto: TicketDto): Promise<Ticket> {
    const ticket: Ticket = new Ticket();
    ticket.title = ticketDto.title;
    ticket.description = ticketDto.description;
    ticket.price = ticketDto.price;
    ticket.id = +id;
    return this.ticketRepository.save(ticket);
  }

  deleteTicket(id: string): Promise<{ affected?: number }> {
    return this.ticketRepository.delete(id);
  }

}
