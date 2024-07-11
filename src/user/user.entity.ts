import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Role } from '../role/role.entity';
import { Transaction } from 'src/transaction/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, role => role.users)
  role: Role;
  
  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];
}
