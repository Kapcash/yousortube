import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RssModule } from 'src/rss/rss.module';

@Module({
  imports: [RssModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
