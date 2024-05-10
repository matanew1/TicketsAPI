import { TicketRating } from './../../entities/ticket_rating.entity';
import { TicketRatingDto } from './../../dto/ticket.rating.dto';

export interface ITicketRatingService {
    createTicketRating(ticketRatingDto: TicketRatingDto): Promise<TicketRating>;
}