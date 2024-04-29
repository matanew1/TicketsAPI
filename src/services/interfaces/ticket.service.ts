import { Ticket } from './../../entities/tickets.entity';
import { TicketDto } from "../../dto/ticket.dto";


export interface ITicketService {
    getTickets(): Promise<Ticket[]>;
    getTicketsByQuery(query: any): Promise<Ticket[]>;
    createTicket(ticketDto: TicketDto): Promise<Ticket>;
    updateTicket(id: string, ticketDto: TicketDto): Promise<Ticket>;
    deleteTicket(id: string): Promise<{ affected?: number }>;
    getTicketById(id: string): Promise<Ticket>;
    deleteAllTickets(): Promise<void>;
}