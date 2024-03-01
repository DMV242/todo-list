import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    await this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  async findAll() {
    return await this.prisma.todo.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) throw new NotFoundException('Task not found');
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    if (this.isTodoExists(id)) {
      return await this.prisma.todo.update({
        where: { id },
        data: updateTodoDto,
      });
    }
    throw new NotFoundException('The todo you want to update not found');
  }

  async remove(id: number) {
    if (this.isTodoExists(id)) {
      return await this.prisma.todo.delete({
        where: { id },
      });
    }
    throw new NotFoundException('This todo does not exist');
  }

  async isTodoExists(id: number) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (todo) return true;
    return false;
  }
}
