import { TicketRating } from './../entities/ticket_rating.entity';
import { TicketRatingDto } from './../dto/ticket.rating.dto';
import { ITicketRatingService } from './../services/interfaces/ticket.rating.service';
import { Controller, Inject, Post, Body } from '@nestjs/common'; // Import HttpStatus

import { ApiTags, ApiBody } from '@nestjs/swagger';

@Controller('tickets/ratings')
@ApiTags('Ticket Rating API')
export class TicketRatingController {
  constructor(
    @Inject('ITicketRatingService')
    private readonly ticketRatingService: ITicketRatingService,
  ) {}

  @Post()
  @ApiBody({ type: TicketRatingDto })
  async createTicketRating(
    @Body() ticketRating: TicketRatingDto,
  ): Promise<TicketRating> {
    return await this.ticketRatingService.createTicketRating(ticketRating);
  }
}
