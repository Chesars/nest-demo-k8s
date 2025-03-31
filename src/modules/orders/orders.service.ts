import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrderDto';
import { OrdersRepository } from './orders.repository';
import { UsersRepository } from '../users/users.repository';
import { CreateOrderDetailDto } from './dto/createOrderDetailDto';

@Injectable()
export class OrdersService {
constructor(
  private readonly ordersRepository: OrdersRepository,
) {}

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }

  addOrder(userId:string, order: CreateOrderDetailDto) {
    return this.ordersRepository.addOrder(userId , order);
  }



}
