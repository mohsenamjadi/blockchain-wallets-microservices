import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
import { UserDocument, UserUpdateFields, UsersRepository } from '@app/common';
import { RefreshTokenRepository } from './refreshtoken.repository';
import { CreateRefreshTokenData } from '../dto/create-refresh-token.event';
import { CreateUserData } from './dto/create-user.event';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly refreshTokenRepository: RefreshTokenRepository,
    ) {}

    async create(createUserData: CreateUserData) {
        await this.validateUserDuplication(createUserData);
        return this.usersRepository.create({
            ...createUserData,
            password: await bcrypt.hash(createUserData.password, 10),
        });
    }

    private async validateUserDuplication(createUserData: CreateUserData) {
        try {
            await this.usersRepository.findOne({
                $or: [
                    { email: createUserData.email },
                    { username: createUserData.username },
                    { phoneNumber: createUserData.phoneNumber },
                ],
            });
        } catch (error) {
            return;
        }
        throw new UnprocessableEntityException('User with the given email, username, or phone number already exists.');
    }


    async verifyUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email });
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if(!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid.');
        }
        return user;
    }

    async getUser(getUserDto: GetUserDto) {
        return await this.usersRepository.findOne(getUserDto);
    }


    async findUserByEmail(email: string): Promise<UserDocument | null> {
        try {
          const user = await this.usersRepository.findOne({ email });
          return user || null;
        } catch (error) {
          // Handle any errors if needed
          console.error("Error in findUserByEmail:", error);
          return null;
        }
    }

    async findUserByEmailVerificationToken(token: string): Promise<UserDocument | null> {
        try {
            const user = await this.usersRepository.findOne({ emailVerificationToken: token });
            return user || null;
        } catch (error) {
            // Handle any errors if needed
            console.error("Error in findUserByEmailVerificationToken:", error);
            return null;
        }
    }
    
    async findUserByForgotPasswordToken(token: string): Promise<UserDocument | null> {
        try {
            const user = await this.usersRepository.findOne({ passwordResetToken: token });
            return user || null;
        } catch (error) {
            // Handle any errors if needed
            console.error("Error in findUserByForgotPasswordToken:", error);
            return null;
        }
    }

    async getAllUsers() {
        return await this.usersRepository.find({});
    }

    async updateUserFields(userId: string, updatedFields: UserUpdateFields): Promise<UserDocument> {
        const filterQuery = { _id: userId };
        const updateQuery: UserUpdateFields = { ...updatedFields };
        const updatedUser = await this.usersRepository.findOneAndUpdate(filterQuery, updateQuery);
        return updatedUser;
    }

    async updateProfile(updatedUser: UpdateUserDto, user: UserDocument): Promise<UserDocument> {
        // Check if the password field is present in the updatedUser
        if (updatedUser.password) {
            // Hash the password before updating the user
            updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
        }

        return await this.usersRepository.findOneAndUpdate(
            { _id: user._id },
            { $set: updatedUser },
          );
    }
    

    async storeRefreshTokenForUser(createRefreshTokenData: CreateRefreshTokenData) {
        await this.refreshTokenRepository.create(createRefreshTokenData);
    }

    async getRefreshTokenData(refreshToken: string) {
        return await this.refreshTokenRepository.findOne({ refreshToken });
    }

    async deleteOldRefreshTokensForUser(userId: mongoose.Types.ObjectId) {
        await this.refreshTokenRepository.deleteMany({ user: userId });
    }
}
