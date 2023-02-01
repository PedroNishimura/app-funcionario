import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployersService } from './employers.service';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Post()
  create() {
    return this.employersService.create();
  }

  @Get()
  findAll() {
    return this.employersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.employersService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.remove(+id);
  }
}
