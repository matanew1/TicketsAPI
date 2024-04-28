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

  async getTickets(): Promise<Ticket[]> {
    return await this.ticketRepository.find();
  }

  async getTicketsByQuery(query: any): Promise<Ticket[]> {
    return await this.ticketRepository.find({ where: query });
  }

  async createTicket(ticketDto: TicketDto): Promise<Ticket> {
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

    return await this.ticketRepository.save(ticket);
  }

  async updateTicket(id: string, ticketDto: TicketDto): Promise<Ticket> {
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

    return await this.ticketRepository.save(ticket);
  }

  async deleteTicket(id: string): Promise<{ affected?: number }> {
    return await this.ticketRepository.delete(id);
  }

  async getTicketById(id: string): Promise<Ticket> {
    return await this.ticketRepository.findOneBy({ id: parseInt(id, 10) });
  }

  async deleteAllTickets(): Promise<void> {
    return await this.ticketRepository.clear();
  }
}
