import { Controller, Post, UseInterceptors, UploadedFile, Request, UseGuards, Get, Body, Req, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RssService } from 'src/rss/rss.service';
import { FileUploaded, UserDoc } from './users.interface';
import { UsersService } from './users.service';
import { SubscriptionService } from 'src/subscriptions/subscription.service';
import { SubscriptionGroupsService } from 'src/subscriptions-groups/subscriptionGroups.service';
import { SubscriptionDoc } from 'src/subscriptions/subscription.interface';
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

  @Post()
  async createAccount(@Body() body) {
    return this.usersService.createNewUser(body.username, body.password);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteAccount(@Req() req) {
    return this.usersService.deleteUser(req.user._id);
  }

  @Post('opml')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: validateOpmlFile,
  }))
  async uploadFile(@Req() req, @UploadedFile() file: FileUploaded) {
    let user: UserDoc = req.user;
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
    return this.subscriptionGroupsService.createSubscriptionGroup(user.id, 'All channels', subscriptions.map(sub => sub.id))
  }
}
