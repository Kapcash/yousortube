import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Get, Body, Req, Delete, ClassSerializerInterceptor } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RssService } from 'src/rss/rss.service';
import { FileUploaded, UserDoc } from './users.interface';
import { UsersService } from './users.service';
import { SubscriptionService } from 'src/subscriptions/subscription.service';
import { SubscriptionGroupsService } from 'src/subscriptions-groups/subscriptionGroups.service';
import { SubscriptionDoc, Subscription } from 'src/subscriptions/subscription.interface';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UserDto } from 'src/dto/user.dto';
import { Request } from 'express';
import { serialize } from 'class-transformer';
import { SubsResponse } from 'src/dto/subscription.dto';

// BIG TODO: Create DTO classes all over the app

/** Validator function for opml upload file */
const validateOpmlFile = (req, file, cb) => {
  const isXmlFile = file.mimetype === 'application/xml';
  cb(null, isXmlFile);
};

@Controller('users')
export class UsersController {

  constructor(
    private readonly rssService: RssService,
    private readonly usersService: UsersService,
    private readonly subscriptionService: SubscriptionService,
    private readonly subscriptionGroupsService: SubscriptionGroupsService,
  ) {}

  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request): UserDto {
    return new UserDto(req.user.toObject());
  }

  @Get('me/subscriptions')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getMySubscriptions(@Req() req: Request): Promise<SubsResponse> {
    return { subs: await this.usersService.getSubscriptions(req.user.id) };
  }

  @Post()
  async createAccount(@Body() body) {
    if (body.password.length < 8) { throw new Error('Password must be at least 8 characters'); }
    return this.usersService.createNewUser(body.username, body.password);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteAccount(@Req() req) {
    return this.usersService.deleteUser(req.user.id);
  }

  @Post('opml')
  @UseInterceptors(FileInterceptor('file', { fileFilter: validateOpmlFile }))
  @UseGuards(JwtAuthGuard)
  async uploadFile(@Req() req, @UploadedFile() file: FileUploaded) {
    const user: UserDoc = req.user;
    // Create a new user if the request is anonym
    // if (!user) {
    //   user = await this.usersService.createNewAnonymUser();
    // }
    const opmlSubs = await this.rssService.parseOpml(file.buffer);
    // Create all subscriptions objects present in the opml file
    const subs: Promise<SubscriptionDoc>[] = [];
    opmlSubs.forEach(sub => {
      subs.push(this.subscriptionService.createSubscription(sub));
    });
    const subscriptions = await Promise.all(subs);
    await user.update({ subscriptions });
    // Create default group with all subscriptions
    return this.subscriptionGroupsService.createSubscriptionGroup(user.id, 'All channels', subscriptions.map(sub => sub.id))
  }
}
