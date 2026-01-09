import { BaseService } from '../../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import {
    CreateUserDto,
    GetUserListQuery,
    UpdateUserDto,
} from '../user.interface';

import { User } from '../../../database/schemas/user.schema';
import { UserRepository } from '../user.repository';
import { UserAttributesForDetail } from '../user.constant';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
    constructor(private readonly userRepository: UserRepository) {
        super(userRepository);
    }

    async createUser(dto: CreateUserDto) {
        const saltOrRound = 10;
        try {
            const user: SchemaCreateDocument<User> = {
                ...(dto as any),
                password: await bcrypt.hash(dto.password, saltOrRound),
            };
            const isUserExists = await this.findOne(dto.name);
            if (isUserExists) {
                throw new Error('User already exists');
            }
            return await this.userRepository.createOne(user);
        } catch (error) {
            this.logger.error('Error in UserService createUser: ' + error);
            throw error;
        }
    }

    async findOne(name: string): Promise<User | null> {
        return this.userRepository.findOne(name);
    }

    async updateUser(id: Types.ObjectId, dto: UpdateUserDto) {
        try {
            await this.userRepository.updateOneById(id, dto);
            return await this.findUserById(id);
        } catch (error) {
            this.logger.error('Error in UserService updateUser: ' + error);
            throw error;
        }
    }

    async deleteUser(id: Types.ObjectId) {
        try {
            await this.userRepository.softDeleteOne({ _id: id });
            return { id };
        } catch (error) {
            this.logger.error('Error in UserService deleteUser: ' + error);
            throw error;
        }
    }

    async findUserById(
        id: Types.ObjectId,
        attributes: (keyof User)[] = UserAttributesForDetail,
    ) {
        try {
            return await this.userRepository.getOneById(id, attributes);
        } catch (error) {
            this.logger.error('Error in UserService findUserById: ' + error);
            throw error;
        }
    }

    async findAllAndCountUserByQuery(query: GetUserListQuery) {
        try {
            const result =
                await this.userRepository.findAllAndCountUserByQuery(query);
            return result;
        } catch (error) {
            this.logger.error(
                'Error in UserService findAllAndCountUserByQuery: ' + error,
            );
            throw error;
        }
    }
}
