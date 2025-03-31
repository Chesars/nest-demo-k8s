import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';
import { ColumnNumericTransformer } from '../../../helpers/valueTransformer';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new ColumnNumericTransformer(),nullable: false })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail, { nullable: true })
  @JoinColumn()
  order: Order;

  @JoinTable()
  @ManyToMany(() => Product, (product) => product.orderDetails)
  products: Product[];
}