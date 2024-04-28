import { Ticket } from './../entities/tickets.entity';
import { BadRequestException } from '@nestjs/common';

class Validator {
  static ticketRatingIsValid(rating: number): void {
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Invalid rating');
    }
  }

  static ticketExist(ticket: Ticket): void {
    if (!ticket) {
      throw new BadRequestException('Ticket not found');
    }
  }

}

export default Validator;
