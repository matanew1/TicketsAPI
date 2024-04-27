import { EntityRepository, Repository } from 'typeorm';
import { Ticket } from '../entities/tickets.entity';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {}