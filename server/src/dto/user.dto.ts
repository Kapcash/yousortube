import { Exclude } from 'class-transformer';
import { Dto } from './dto';

/** Exposed user DTO entity */
export class UserDto extends Dto {
  login: string;
  creationDate: string;

  @Exclude()
  password: string;

  @Exclude()
  subscriptions: string;

  constructor(partial: Partial<UserDto>) {
    super();
    Object.assign(this, partial);
  }
}
