import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, CreateUserDTO, UpdateUserDTO } from './user';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly user: Model<UserDocument>,
  ) {}

  async getUsers(): Promise<UserDocument[]> {
    return await this.user.find().exec();
  }

  async getUser(id: string): Promise<UserDocument> {
    return await this.user.findById(id).exec();
  }

  async createUser(user: CreateUserDTO): Promise<UserDocument> {
    return await (await this.user.create(user)).save();
  }

  async updateUser(user: UpdateUserDTO): Promise<UserDocument> {
    return await (
      await this.user.findByIdAndUpdate(user.id, user, { new: true })
    ).save();
  }

  async deleteUser(userId: string): Promise<boolean> {
    const result = await this.user.deleteOne({ _id: userId }).exec();
    if (result.ok !== 1) return false;
  }
}
