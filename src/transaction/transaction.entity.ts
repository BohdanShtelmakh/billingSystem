import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  amount: number;

  @Column()
  type: 'deposit' | 'transfer'; 

  @Column({ nullable: true })
  toUserId: number;
}
