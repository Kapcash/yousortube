import { Controller, Post, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RssService } from 'src/rss/rss.service';
import { FileUploaded, UserDoc } from './users.interface';
import { UsersService } from './users.service';
import { SubscriptionService } from 'src/subscriptions/subscription.service';
import { SubscriptionGroupsService } from 'src/subscriptions-groups/subscriptionGroups.service';
import { SubscriptionDoc } from 'src/subscriptions/subscription.interface';

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

  @Post('opml')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: validateOpmlFile,
  }))
  async uploadFile(@UploadedFile() file: FileUploaded) {
    const unauthenticated = true;
    let user: UserDoc;
    // Create a new user if the request is anonym
    if (unauthenticated) {
      user = await this.usersService.createNewUser();
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
