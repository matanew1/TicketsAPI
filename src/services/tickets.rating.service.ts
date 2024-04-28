import { Ticket } from './../entities/tickets.entity';
import { TicketRating } from './../entities/ticket_rating.entity';
import { TicketRatingDto } from './../dto/ticket.rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Validator from '../utils/ticket.validate';

@Injectable()
export class TicketRatingService {
  constructor(
    @InjectRepository(TicketRating)
    private readonly ticketRatingRepository: Repository<TicketRating>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async createTicketRating(
    ticketRatingDto: TicketRatingDto,
  ): Promise<TicketRating> {
    const { ticketId, rating } = ticketRatingDto;
    const ticket = await this.ticketRepository.findOneBy({ id: ticketId });
    Validator.validateFindTicket(ticket);
    Validator.validateTicketRating(rating);
    const ticketRating = new TicketRating();
    ticketRating.ticket = ticket;
    ticketRating.rating = rating;
    return await this.ticketRatingRepository.save(ticketRating);
  }
}
