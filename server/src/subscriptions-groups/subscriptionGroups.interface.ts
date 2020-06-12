import { Document, Schema, Types } from 'mongoose';
import { Subscription } from 'src/subscriptions/subscription.interface';

// === SubscriptionGroup === //

export interface SubscriptionGroup {
  readonly userId: Types.ObjectId;
  readonly title: string;
  readonly channels: Types.ObjectId[] | Subscription[];
  readonly creationDate?: Date;
}

export interface SubscriptionGroupDoc extends SubscriptionGroup, Document {}

export const SubscriptionGroupSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, default: 'New group' },
  channels: [{
    type: Schema.Types.ObjectId,
    ref: 'Subscription'
  }],
  creationDate: { type: Date, default: Date.now },
});

SubscriptionGroupSchema.index({ userId: 1, title: 1}, { unique: true });

export interface CreateSubGroupDto {
  groupTitle: string,
  channelIds?: string[]
}

export enum Operation {
  Add = 'add',
  Remove = 'remove'
}

/** Patch Dto to add or remove channel ids to a sub group */
export type PatchOperation = {
  [key in Operation]: string[];
};