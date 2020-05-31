import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, CreateUserDTO, UpdateUserDTO, User } from './user';
import { Model } from 'mongoose';
import { hash } from 'argon2';
import { NotificationSub } from '../Models2/notificationSub';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly user: Model<UserDocument>,
  ) { }

  async getUsers(): Promise<UserDocument[]> {
    return await this.user.find().exec();
  }

  async getUsersById(userIds: string[]): Promise<UserDocument[]> {
    let users: any[] = []
    for (const id of userIds) {
      const u = await (await this.user.findOne({_id: id})).toObject()
      users = [...users, u]
    }
    return users
  }

  async getUser(id: string): Promise<UserDocument> {
    return await this.user.findById(id).exec();
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return await this.user.findOne({ email }).exec();
  }

  async createUser(user: CreateUserDTO): Promise<UserDocument> {
    user.password = await hash(user.password);
    return await (await this.user.create(user)).save();
  }

  async updateUser(userId: string, user: UpdateUserDTO): Promise<UserDocument> {
    try {
      return (await this.user.findByIdAndUpdate(userId, user, { new: true })).save()
    } catch (error) {
      console.log(error)
    }
  }

  async updateUserNotificationSubscribtion(userId: string, notiSub: NotificationSub) {
    const user = await this.user.findById(userId)
    user.notificationSubscription = notiSub;
    await user.save()
  }


  async deleteUser(userId: string): Promise<boolean> {
    const result = await this.user.deleteOne({ _id: userId }).exec();
    if (result.ok !== 1) return false;
  }
}
