 import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderDetail } from './order-details.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders,)
  user: User;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @OneToOne(() => OrderDetail, { nullable: false })
  @JoinColumn()
  orderDetail: OrderDetail;
}
 
