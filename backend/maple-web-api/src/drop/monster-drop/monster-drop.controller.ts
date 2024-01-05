import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MonsterDropData } from 'src/entities/monster-drop-data.entity';
import { MonsterDropDetailQueryParams, MonsterDropDto, MonsterDropQueryParams } from '../dtos/monster-drop-dtos.interface';
import { monsterDropService } from './monster-drop.service';

@Controller('monster-drop')
export class MonsterDropController {

  constructor(
    private service: monsterDropService
  ) { }

  @Get()
  fetchOne(@Query() data: { id: number }) {
    return this.service.fetchOne(data.id);
  }

  @Post("list")
  fetch(@Body() params: MonsterDropQueryParams) {
    return this.service.fetch(params);
  }

  @Post("detail")
  fetchDetail(@Body() params: MonsterDropDetailQueryParams) {
    return this.service.fetchDetail(params);
  }

  @Post("add")
  add(@Body() params: MonsterDropDto) {
    const data: MonsterDropData = params as MonsterDropData;
    return this.service.add(data);
  }

  @Post("modify")
  modify(@Body() params: MonsterDropDto) {
    const data: MonsterDropData = params as MonsterDropData;
    return this.service.edit(data);
  }

  @Get("delete")
  del(@Query() data: { id: number }) {
    return this.service.delete(data.id);
  }
}
