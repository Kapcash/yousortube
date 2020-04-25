import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDoc, User } from './users.interface';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectModel('Users') private userModel: Model<UserDoc>,
  ){}
    
  findOne(username: string): Promise<User> {
    return this.userModel.findOne({ login: username }).exec()
      .then(user => user.toObject())
      .then(user => {
        user._id = user._id.toString();
        return user;
      });
  }

  findOneById(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId }).exec()
      .then(user => user.toObject())
      .then(user => {
        user._id = userId;
        return user;
      });
  }

  createNewAnonymUser(): Promise<UserDoc> {
    return this.userModel.create({});
  }

  createNewUser(username: string, password: string): Promise<UserDoc> {
    try {
      return this.userModel.create({
        login: username,
        password
      });
    } catch (err) {
      // TODO Handle username already exists
    }
  }
}
