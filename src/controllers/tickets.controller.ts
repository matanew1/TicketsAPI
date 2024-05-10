import { Ticket } from './../entities/tickets.entity';
import { TicketDto } from './../dto/ticket.dto';
import { ITicketService } from './../services/interfaces/ticket.service';
import {
  Controller,
  Inject,
  Put,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common'; // Import HttpStatus
import { ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('tickets')
@ApiTags('Ticket API')
export class TicketController {
  constructor(
    @Inject('ITicketService') private readonly ticketService: ITicketService,
  ) {}

  @Get()
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'description', required: false })
  @ApiQuery({ name: 'price', required: false })
  @ApiQuery({ name: 'rating', required: false })
  async getTickets(@Query() query?: any): Promise<Ticket[]> {
    if (
      query &&
      (query.title || query.description || query.price || query.rating)
    ) {
      return this.ticketService.getTicketsByQuery(query);
    }

    return this.ticketService.getTickets();
  }

  @Post()
  @ApiBody({ type: TicketDto })
  async createTicket(@Body() ticket: TicketDto): Promise<Ticket> {
    return await this.ticketService.createTicket(ticket);
  }

  @Put(':id')
  @ApiBody({ type: TicketDto })
  async updateTicket(
    @Param('id') id: string,
    @Body() ticket: TicketDto,
  ): Promise<Ticket> {
    return await this.ticketService.updateTicket(id, ticket);
  }

  @Delete(':id')
  async deleteTicket(@Param('id') id: string): Promise<string> {
    await this.ticketService.deleteTicket(id);
    return 'Ticket deleted successfully';
  }

  @Get(':id')
  async getTicketById(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.getTicketById(id);
  }

  @Delete()
  async deleteAllTickets(): Promise<string> {
    await this.ticketService.deleteAllTickets();
    return 'All tickets deleted successfully';
  }
}
