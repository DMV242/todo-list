import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly primsa: PrismaService,
  ) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    this.todoService.create(createTodoDto);
    return {
      message: 'Data has been successfully added',
    };
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todoService.findOne(+id);
  }

  @Put(':id')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.todoService.remove(+id);
  }
}
