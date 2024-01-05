import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WzConsume } from 'src/entities/wz-consume.entity';
import { ConsumeController } from './consume/consume.controller';
import { ConsumeService } from './consume/consume.service';

@Module({
  imports: [TypeOrmModule.forFeature([WzConsume])],
  controllers: [ConsumeController],
  providers: [ConsumeService]
})
export class WzModule { }
