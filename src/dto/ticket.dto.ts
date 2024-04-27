// ticket.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength, Min } from 'class-validator';

export class TicketDto {
  @ApiProperty({
    example: 'Concert Ticket',
    description: 'The title of the ticket',
    required: true,
  })
  @IsString()
  @MinLength(1, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is a concert ticket',
    description: 'The description of the ticket',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
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
}
