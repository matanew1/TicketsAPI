import { Ticket } from './../entities/tickets.entity';
import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

class Validator {
  static ticketRatingIsValid(rating: number): void {
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Invalid rating');
    }
  }

  static ticketExist(ticket: Ticket): void {
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
  }

  static ticketsExist(tickets: Ticket[]): void {
    if (!tickets || tickets.length === 0) {
      throw new NotFoundException('Tickets not found');
    }
  }

  static ticketDateIsValid(date: Date): void {
    if (date < new Date()) {
      throw new BadRequestException(`Date of ${date} must be in the future.`);
    }
  }
}

export default Validator;
