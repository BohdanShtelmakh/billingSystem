import { DataSource } from 'typeorm';
import { run } from './seeds';
import { AppModule } from 'src/app.module';
import { NestFactory } from '@nestjs/core';

async function runSeeder() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  await run(dataSource);
  await app.close();
}
runSeeder();