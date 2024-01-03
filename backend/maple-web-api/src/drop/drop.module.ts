import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalDrop } from 'src/entities/global-drop.entity';
import { GlobalDropController } from './global-drop/global-drop.controller';
import { MonsterDropController } from './monster-drop/monster-drop.controller';
import { ReactorDropController } from './reactor-drop/reactor-drop.controller';
import { GlobalDropService } from './global-drop/global-drop.service';
import { MonsterDropData } from 'src/entities/monster-drop-data.entity';
import { monsterDropService } from './monster-drop/monster-drop.service';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalDrop, MonsterDropData])],
  controllers: [GlobalDropController, MonsterDropController, ReactorDropController],
  providers: [GlobalDropService, monsterDropService]
})
export class DropModule { }
