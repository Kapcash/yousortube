import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDoc } from './users.interface';
import { hash } from 'bcrypt';
import { Subscription } from 'src/subscriptions/subscription.interface';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectModel('Users') private userModel: Model<UserDoc>
  ){}
    
  findOne(username: string): Promise<UserDoc> {
    return this.userModel.findOne({ login: username }).exec();
  }

  findOneById(userId: string): Promise<UserDoc> {
    return this.userModel.findOne({ _id: userId }).exec()
  }

  async getSubscriptions(userId: string): Promise<Subscription[]> {
    const user = await this.userModel.findOne({ _id: userId }).populate('subscriptions').exec()
    return user.subscriptions;
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userModel.findOne({ _id: userId }).exec();
    user.remove();
  }

  createNewAnonymUser(): Promise<UserDoc> {
    return this.userModel.create({});
  }

  async createNewUser(username: string, password: string): Promise<UserDoc> {
    const passwordHash = await hash(password, 12)
    try {
      const createdUser = await this.userModel.create({
        login: username,
        password: passwordHash,
      });
      return this.findOneById(createdUser.id);
    } catch (err) {
      if (err.code === 11000) { // Duplicate login
        throw new BadRequestException('This login is already taken.');
      }
      throw new InternalServerErrorException('An error happened when creating the user.');
    }
  }
}
