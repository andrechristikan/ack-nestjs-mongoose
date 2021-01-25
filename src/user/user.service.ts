import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserEntity, UserDatabaseName } from 'user/user.schema';
import { IUserCreate, IUserUpdate } from 'user/user.interface';

import { Helper } from 'helper/helper.decorator';
import { HelperService } from 'helper/helper.service';

@Injectable()
export class UserService {
    constructor(
        @Helper() private readonly helperService: HelperService,
        @InjectModel(UserDatabaseName)
        private readonly userModel: Model<UserEntity>
    ) {}

    async findAll(
        skip: number,
        limit: number,
        find?: Record<string, any>
    ): Promise<UserEntity[]> {
        return this.userModel
            .find(find)
            .select('-password,-salt')
            .skip(skip)
            .limit(limit)
            .exec();
    }

    async findOneById(userId: string): Promise<UserEntity> {
        return this.userModel.findById(userId).exec();
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return this.userModel
            .findOne({
                email: email
            })
            .exec();
    }

    async findOneByMobileNumber(mobileNumber: string): Promise<UserEntity> {
        return this.userModel
            .findOne({
                mobileNumber: mobileNumber
            })
            .exec();
    }

    async create(data: IUserCreate): Promise<UserEntity> {
        const salt: string = await this.helperService.randomSalt();
        const passwordHash = await this.helperService.hashPassword(
            data.password,
            salt
        );
        const user: UserEntity = new this.userModel(data);
        user.firstName = data.firstName.toLowerCase();
        user.lastName = data.lastName.toLowerCase();
        user.email = data.email.toLowerCase();
        user.password = passwordHash;
        user.salt = salt;
        return user.save();
    }

    async deleteOneById(userId: string): Promise<UserEntity> {
        return this.userModel.findByIdAndDelete(userId).exec();
    }

    async updateOneById(
        userId: string,
        data: IUserUpdate
    ): Promise<UserEntity> {
        const user: UserEntity = await this.findOneById(userId);
        user.firstName = data.firstName.toLowerCase();
        user.lastName = data.lastName.toLowerCase();
        return user.save();
    }
}
