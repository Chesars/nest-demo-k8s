import { Controller, NotFoundException, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrderDto';
import { OrdersService } from './orders.service';
import { Get, Param } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/createOrderDetailDto';
import { AuthGuard } from '../auth/guards/auth.guard.middleware';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async getOrder(@Param('id', ParseUUIDPipe) id: string ) {
    const order = await this.ordersService.getOrder(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async addOrder(@Body() order: CreateOrderDetailDto) {
    const {userId} = order
    try {
      return await this.ordersService.addOrder(userId,order);
    } catch (error) {
      throw new NotFoundException(`Failed to add order: ${error.message} duplicated`);
    }
  }
  
}
