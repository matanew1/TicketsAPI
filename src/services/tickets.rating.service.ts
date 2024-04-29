import { Ticket } from './../entities/tickets.entity';
import { TicketRating } from './../entities/ticket_rating.entity';
import { TicketRatingDto } from './../dto/ticket.rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Validator from '../utils/ticket.validate';
import { ITicketRatingService } from './interfaces/ticket.rating.service';

@Injectable()
export class TicketRatingService implements ITicketRatingService {
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
    Validator.ticketExist(ticket);
    Validator.ticketRatingIsValid(rating);
    const ticketRating = new TicketRating();
    ticketRating.ticket = ticket;
    ticketRating.rating = rating;
    return await this.ticketRatingRepository.save(ticketRating);
  }
}
