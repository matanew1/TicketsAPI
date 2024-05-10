import { TicketRating } from './../entities/ticket_rating.entity';
import { Ticket } from './../entities/tickets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketDto } from './../dto/ticket.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import Validator from '../utils/ticket.validate';
import { ITicketService } from './interfaces/ticket.service';

@Injectable()
export class TicketService implements ITicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(TicketRating)
    private readonly ticketRatingRepository: Repository<TicketRating>,
  ) {}

  async getTickets(): Promise<Ticket[]> {
    const tickets = await this.ticketRepository.find();
    Validator.ticketsExist(tickets);
    return tickets;
  }

  async getTicketsByQuery(query: any): Promise<Ticket[]> {
    if (query.rating) {
      query.rating = parseInt(query.rating, 10);
      Validator.ticketRatingIsValid(query.rating);
      const allTicketsByRating = await this.ticketRepository.createQueryBuilder('ticket')
        .leftJoinAndSelect('ticket.ratings', 'rating')
        .where('rating.rating = :rating', { rating: query.rating })
        .getMany();
      if (allTicketsByRating.length === 0) {
        throw new BadRequestException(`No tickets with rating ${query.rating} found.`);
      }
      return allTicketsByRating;
    }
    if (query.price) {
      query.price = parseFloat(query.price);
    }
    if (query.amount) {
      query.amount = parseInt(query.amount, 10);
    }
    if (query.date) {
      query.date = new Date(query.date);
    }

    const tickets = await this.ticketRepository.find({ where: query });
    Validator.ticketsExist(tickets);
    return tickets;
  }

  async createTicket(ticketDto: TicketDto): Promise<Ticket> {
    const date = new Date(ticketDto.date);
    Validator.ticketDateIsValid(date);

    const ticket: Ticket = new Ticket();
    ticket.title = ticketDto.title;
    ticket.description = ticketDto.description;
    ticket.price = ticketDto.price;
    ticket.amount = ticketDto.amount;
    ticket.date = date;

    return await this.ticketRepository.save(ticket);
  }

  async updateTicket(id: string, ticketDto: TicketDto): Promise<Ticket> {
    const ticketToUpdate = await this.ticketRepository.findOneBy({ id: parseInt(id, 10) });
    if (!ticketToUpdate) {
      throw new NotFoundException('Ticket not found.');
    }
    const date = new Date(ticketDto.date);
    if (date < new Date()) {
      throw new NotFoundException('Date must be in the future.');
    }

    ticketToUpdate.title = ticketDto.title;
    ticketToUpdate.description = ticketDto.description;
    ticketToUpdate.price = ticketDto.price;
    ticketToUpdate.amount = ticketDto.amount;
    ticketToUpdate.date = date;

    return await this.ticketRepository.save(ticketToUpdate);
  }

  async deleteTicket(id: string): Promise<{ affected?: number }> {
    if (!(await this.ticketRepository.findOneBy({ id: parseInt(id, 10) }))) {
      throw new NotFoundException('Ticket not found.');
    }
    return await this.ticketRepository.delete(id);
  }

  async getTicketById(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOneBy({ id: parseInt(id, 10) });
    if (!ticket) {
      throw new NotFoundException('Ticket not found.');
    }
    return ticket;
  }

  async deleteAllTickets(): Promise<void> {
    return await this.ticketRepository.clear();
  }
}
