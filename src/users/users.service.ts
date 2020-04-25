import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDoc } from './users.interface';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectModel('Users') private userModel: Model<UserDoc>
  ){}
    
  findOne(username: string, withPassword = false): Promise<UserDoc> {
    let query = this.userModel.findOne({ login: username })
    if (!withPassword) {
      query = query.select('-password');
    }
    return query.exec();
  }

  findOneById(userId: string): Promise<UserDoc> {
    return this.userModel.findOne({ _id: userId }).select('-password').exec()
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userModel.findOne({ _id: userId }).exec();
    user.remove();
  }

  createNewAnonymUser(): Promise<UserDoc> {
    return this.userModel.create({});
  }

  async createNewUser(username: string, password: string): Promise<UserDoc> {
    try {
      const createdUser = await this.userModel.create({
        login: username,
        password
      });
      return this.findOneById(createdUser.id);
    } catch (err) {
      // TODO Handle username already exists
      console.error(err);
    }
  }
}
