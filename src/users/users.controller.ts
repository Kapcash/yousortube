import { Controller, Post, UseInterceptors, UploadedFile, Request, UseGuards, Get, Body, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RssService } from 'src/rss/rss.service';
import { FileUploaded, UserDoc, User } from './users.interface';
import { UsersService } from './users.service';
import { SubscriptionService } from 'src/subscriptions/subscription.service';
import { SubscriptionGroupsService } from 'src/subscriptions-groups/subscriptionGroups.service';
import { SubscriptionDoc } from 'src/subscriptions/subscription.interface';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('new')
  @UseGuards(JwtAuthGuard)
  async createAccount(@Body() body) {
    const user = await this.usersService.createNewUser(body.username, body.password);
  }

  @Post('opml')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: validateOpmlFile,
  }))
  async uploadFile(@Req() req, @UploadedFile() file: FileUploaded) {
    let user: User = req.user;
    // Create a new user if the request is anonym
    if (!user) {
      user = await this.usersService.createNewAnonymUser();
    }
    const opmlSubs = await this.rssService.parseOpml(file.buffer);
    // Create all subscriptions objects present in the opml file
    const subs: Promise<SubscriptionDoc>[] = [];
    opmlSubs.forEach(sub => {
      subs.push(this.subscriptionService.createSubscription(sub));
    });
    const subscriptions = await Promise.all(subs);
    // Create default group with all subscriptions
    return this.subscriptionGroupsService.createSubscriptionGroup(user._id, 'All channels', subscriptions.map(sub => sub.id))
  }
}
