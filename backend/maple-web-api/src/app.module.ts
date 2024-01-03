import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DropModule } from './drop/drop.module';
import { MonsterDropData } from './entities/monster-drop-data.entity';
import { GlobalDrop } from './entities/global-drop.entity';
import { ReactorDropData } from './entities/reactor-drop-data.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'cosmic',
      entities: [GlobalDrop, MonsterDropData, ReactorDropData],
      synchronize: false,
    }),
    DropModule
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
