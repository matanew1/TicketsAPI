import { TicketRating } from './../entities/ticket_rating.entity';
import { TicketRatingDto } from './../dto/ticket.rating.dto';
import { TicketRatingService } from './../services/tickets.rating.service';
import { Controller, Post, Body,  } from '@nestjs/common'; // Import HttpStatus

import { ApiTags, ApiBody } from '@nestjs/swagger';

@Controller('tickets/ratings')
@ApiTags('Ticket Rating API')
export class TicketRatingController {
  constructor(private readonly ticketRatingService: TicketRatingService) {}

  @Post()
  @ApiBody({ type: TicketRatingDto })
  async createTicketRating(
    @Body() ticketRating: TicketRatingDto,
  ): Promise<TicketRating> {
    return await this.ticketRatingService.createTicketRating(ticketRating);
  }
}
