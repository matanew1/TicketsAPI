import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class TicketRatingDto {
  @ApiProperty({
    example: 5,
    description: 'The rating of the ticket',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the ticket',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  ticketId: number;
}