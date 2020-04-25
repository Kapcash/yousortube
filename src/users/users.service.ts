import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDoc, User } from './users.interface';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectModel('Users') private userModel: Model<UserDoc>
  ){}
    
  findOne(username: string): Promise<User> {
    return this.userModel.findOne({ login: username }).exec()
      .then(user => this.getUserObject(user, false))
  }

  findOneById(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId }).exec()
      .then(user => this.getUserObject(user, false))
  }

  /** Return the user object simplified, and without the password */
  getUserObject(user: UserDoc, hidePassword = true): User {
    const userObj = user.toObject();
    const { password, ...rest } = userObj;
    return hidePassword ? rest : userObj;
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userModel.findOne({ _id: userId }).exec();
    user.remove();
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
      console.error(err);
    }
  }
}
