import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(email: string, password: string): Promise<User> {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) throw new BadRequestException('User already exists');

        const newUser = new this.userModel({ email, password });
        return newUser.save();
    }

    async findOne(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}
