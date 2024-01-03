import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { GlobalDrop } from 'src/entities/global-drop.entity';
import { GlobalDropDto, GlobalDropQueryParams } from '../dtos/global-drop-dtos.interface';
import { GlobalDropService } from './global-drop.service';

@Controller('global-drop')
export class GlobalDropController {

  constructor(
    private service: GlobalDropService
  ) { }

  @Post("list")
  fetch(@Body() params: GlobalDropQueryParams) {
    return this.service.fetch(params);
  }

  @Post("add")
  add(@Body() params: GlobalDropDto) {
    let data: GlobalDrop = params as GlobalDrop;
    return this.service.add(data);
  }

  @Post("modify")
  modify(@Body() params: GlobalDropDto) {
    let data: GlobalDrop = params as GlobalDrop;
    return this.service.edit(data);
  }

  @Get("delete")
  del(@Query() data: { id: number }) {
    return this.service.delete(data.id);
  }
}
