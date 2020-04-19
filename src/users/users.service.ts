import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDoc } from './users.interface';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('Users') private userModel: Model<UserDoc>,
  ){}

  createNewUser(): Promise<UserDoc> {
    try {
      return this.userModel.create({});
    } catch (err) {
      console.error(err);
    }
  }
}
