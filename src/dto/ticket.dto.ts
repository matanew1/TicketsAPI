import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString, IsDate, Min } from 'class-validator';

export class TicketDto {
  @ApiProperty({
    example: 'Concert',
    description: 'The title of the ticket',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'A concert ticket',
    description: 'The description of the ticket',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
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
    example: 10,
    description: 'The amount of tickets available',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: '2022-12-31',
    description: 'The date of the event',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  date: Date;
}