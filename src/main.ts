import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();

Array.prototype.uniq = function uniq() {
  return this.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
  })
}