// ticket.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength, Min, IsDate } from 'class-validator';

export class TicketDto {
  @ApiProperty({
    example: 'Concert Ticket',
    description: 'The title of the ticket',
    required: true,
  })
  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is a concert ticket',
    description: 'The description of the ticket',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Description must have at least 2 characters.' })
  description: string;

  @ApiProperty({
    example: 100,
    description: 'The price of the ticket',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 50,
    description: 'The amount of tickets available',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: '2025-01-01',
    description: 'The date of the event',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  date: Date;
}