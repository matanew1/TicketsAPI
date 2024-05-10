import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { TicketRating } from './ticket_rating.entity'; // Assuming the TicketRating entity is in the same directory

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  amount: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date: Date;

  @OneToMany(() => TicketRating, (ticketRating) => ticketRating.ticket, {
    cascade: true,
    eager: true,
  })
  ratings: TicketRating[];
}
