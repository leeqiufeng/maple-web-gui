import { Body, Controller, Post } from '@nestjs/common';
import { WzQueryParams } from 'src/drop/dtos/wz-dtos.interface';
import { ConsumeService } from './consume.service';

@Controller('consume')
export class ConsumeController {

  constructor(private service: ConsumeService) {

  }

  @Post("list")
  fetch(@Body() params: WzQueryParams) {
    return this.service.fetch(params);
  }
}
