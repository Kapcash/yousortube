import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RssService } from 'src/rss/rss.service';
import { FileUploaded } from './users.interface';

@Controller('users')
export class UsersController {

  constructor(
    private readonly rssService: RssService,
  ) {}
  
  @Post('opml')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      const isXmlFile = file.mimetype === 'application/xml';
      cb(null, isXmlFile);
    }
  }))
  async uploadFile(@UploadedFile() file: FileUploaded) {
    const opml = await this.rssService.parseOpml(file.buffer);
  }
}
