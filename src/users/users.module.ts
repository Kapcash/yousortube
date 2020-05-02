import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RssModule } from 'src/rss/rss.module';
import { UserSchema } from './users.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionGroupsModule } from 'src/subscriptions-groups/subscriptionGroups.module';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { SubscriptionGroupsService } from 'src/subscriptions-groups/subscriptionGroups.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeatureAsync([{
      name: 'Users',
      imports: [SubscriptionGroupsModule],
      inject: [SubscriptionGroupsService],
      useFactory: (subscriptionGroupService: SubscriptionGroupsService) => {
        const schema = UserSchema;
        schema.pre('remove', function () {
          subscriptionGroupService.deleteAllSubscriptionGroup(this.id);
        });
        return schema;
      },
    }]),
    RssModule,
    SubscriptionsModule,
    SubscriptionGroupsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
