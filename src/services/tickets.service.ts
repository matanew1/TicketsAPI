import { Ticket } from './../entities/tickets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketDto } from './../dto/ticket.dto';
import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

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
    const date = new Date(ticketDto.date);
    if (date < new Date()) {
      throw new BadRequestException(`Date of ${date} must be in the future.`);
    }
    const ticket: Ticket = new Ticket();
    ticket.title = ticketDto.title;
    ticket.description = ticketDto.description;
    ticket.price = ticketDto.price;
    ticket.amount = ticketDto.amount;
    ticket.date = date;

    return this.ticketRepository.save(ticket);
  }

  updateTicket(id: string, ticketDto: TicketDto): Promise<Ticket> {
    const date = new Date(ticketDto.date);
    if (date < new Date()) {
      throw new BadRequestException('Date must be in the future.');
    }

    const ticket: Ticket = new Ticket();
    ticket.title = ticketDto.title;
    ticket.description = ticketDto.description;
    ticket.price = ticketDto.price;
    ticket.amount = ticketDto.amount;
    ticket.date = date;
    ticket.id = +id;

    return this.ticketRepository.save(ticket);
  }

  deleteTicket(id: string): Promise<{ affected?: number }> {
    return this.ticketRepository.delete(id);
  }

  getTicketById(id: string): Promise<Ticket> {
    return this.ticketRepository.findOneBy({ id: parseInt(id, 10) });
  }
}
