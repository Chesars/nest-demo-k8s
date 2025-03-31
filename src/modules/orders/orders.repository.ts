import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CreateOrderDetailDto } from './dto/createOrderDetailDto';
import { ProductsRepository } from '../products/products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, In, MoreThan, Repository } from 'typeorm';
import { OrderDetail } from './entities/order-details.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/createOrderDto';

@Injectable()
export class OrdersRepository {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly productsRepository: ProductsRepository,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly ordersDetailRepository: Repository<OrderDetail>,
    private dataSource: DataSource,
  ) {}

  async getOrder(id: string) {
    return await this.ordersRepository.findOne({
      where: { id },
      relations: { orderDetail: { products: true } },
    });
  }

  async addOrder(userId: string, order: CreateOrderDetailDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      console.log('Usuario encontrado', user);

      const productIds = order.products.map((product) => product.id);

      const products = await queryRunner.manager.find(Product, {
        where: {
          id: In(productIds),
          stock: MoreThan(0),
        },
      });
      /* await queryRunner.manager.update(Product, { id: In(productIds) }, { stock: () => "stock - 1" }); */
      for (const product of products) {
        await queryRunner.manager.update(
          Product,
          { id: product.id },
          { stock: product.stock - 1 },
        );
      }

      console.log('Productos encontrados', products);

      if (products.length !== order.products.length) {
        throw new NotFoundException(
          'Some products are not available or out of stock',
        );
      }

      let totalPrice = products.reduce(
        (sum, product) => sum + parseFloat(product.price.toString()),
        0,
      );

      console.log('precio total', totalPrice);

      const orderDetail = queryRunner.manager.create(OrderDetail, {
        price: totalPrice,
        products: products, // checkear que onda esto si se asigna correctametne en la tabla...
      });

      await queryRunner.manager.save(orderDetail);

      console.log(
        'instancia de detalle de orden creada y guardada',
        orderDetail,
      );

      const newOrder = queryRunner.manager.create(Order, {
        date: new Date(),
        orderDetail: orderDetail,
        user: { id: userId },
      });

      await queryRunner.manager.save(Order, newOrder);

      console.log('instancia de orden creada y guardada', newOrder);

      const newOrderDetails = queryRunner.manager.create(OrderDetail, {
        ...orderDetail,
        order: newOrder,
      });

      await queryRunner.manager.save(newOrderDetails);

      console.log('El detalle de orden se actualizo...', orderDetail);

      console.log('el id de la orden es ', newOrder.id); // nose para que pingo ..

      await queryRunner.commitTransaction();

      return {
        orderId: newOrder.id,
        totalPrice,
        orderDetailId: newOrderDetails.id,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
