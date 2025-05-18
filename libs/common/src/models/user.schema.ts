import { ApiProperty } from '@nestjs/swagger';
import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {

    @ApiProperty({
        type: Date,
        format: 'date',
        description: 'The date user created account',
    })
    @Prop()
    createdAt: Date;

    @ApiProperty({
        type: Date,
        format: 'date',
        description: 'The date user updated account',
    })
    @Prop()
    updatedAt: Date;
  
    
    @ApiProperty({
        type: String,
        format: 'email',
        description: 'The email address of the user.',
        example: 'user@example.com',
    })
    @Prop()
    email: string;

    @ApiProperty({
        type: String,
        format: 'username',
        description: 'The username of the user.',
        example: 'test',
    })
    @Prop()
    username: string;

    @ApiProperty({
        type: String,
        format: 'password',
        description: 'The password of the user.',
        example: 'StrongPassword123!',
    })
    @Prop()
    password: string;
 

    @ApiProperty({
        type: String,
        format: 'googleId',
        description: 'The googleId of the user.',
        example: '106986169744001300928',
    })
    @Prop()
    googleId: string;


    @ApiProperty({
        type: String,
        format: 'phoneNumber',
        description: 'The phoneNumber of the user.',
        example: '+12083417963',
    })
    @Prop()
    phoneNumber: string;


    @ApiProperty({
        type: String,
        format: 'picture',
        description: 'The picture of the user.',
        example: 'https://lh3.googleusercontent.com/a/ACg8ocKMf6AztCnsvBoHkdQkH74Lf3Sm2_aIP6g7qksra2fsI1k=s96-c',
    })
    @Prop()
    picture: string;


    @ApiProperty({
        type: String,
        format: 'name',
        description: 'The firstName of the user.',
    })
    @Prop()
    firstName: string;


    @ApiProperty({
        type: String,
        format: 'name',
        description: 'The lastName of the user.',
    })
    @Prop()
    lastName: string;

    @ApiProperty({
        type: [String],
        format: 'array string',
        description: 'The roles of the user.',
    })
    @Prop()
    roles: string[];

    @ApiProperty({
        type: String,
        format: 'string',
        description: 'The companyName of the user.',
        example: 'test',
    })
    @Prop()
    companyName: string;

    @ApiProperty({
        type: String,
        format: 'string',
        description: 'The Description of the company.',
        example: 'test',
    })
    @Prop()
    companyDescription: string;

    @ApiProperty({
        type: Number,
        description: 'The age of the user.',
        example: 25,
    })
    @Prop({ default: 0 })
    age: number;


    @ApiProperty({
        type: String,
        description: 'The country of the user.',
        example: 'United States',
    })
    @Prop({ default: '' })
    country: string;


    @ApiProperty({
        type: String,
        description: 'The city of the user.',
        example: 'New York',
    })
    @Prop({ default: '' })
    city: string;

    @ApiProperty({
        type: String,
        description: 'The postalCode of the user.',
        example: '2446',
    })
    @Prop({ default: '' })
    postalCode: string;

    @ApiProperty({
        type: String,
        description: 'The walletAddress of the user.',
        example: 'TVoQDhiCvBDvMCg62gKGhA489t6XCp3Frj',
    })
    @Prop({ default: '' })
    walletAddress: string;

    @ApiProperty({
        type: Number,
        description: 'The sum  of all the transactions the user had in USD.',
        example: 7800,
    })
    @Prop({ default: 0 })
    totalTransactionAmount: number;

    @ApiProperty({
        type: String,
        description: 'The apiKey of the merchant.',
        example: 'VoQDhiCvBDvMCg62gKGhA489t6XCp3FrjTVoQDhiCvBDvMCg62gKGhA489t6XCp3Frj',
    })
    @Prop({ default: '' })
    apiKey: string;

    @ApiProperty({
        type: String,
        description: 'Is the user accecpted by admin.',
        example: 'false',
    })
    @Prop({ default: false })
    acceptedByAdmin: boolean;


    @ApiProperty({
        type: String,
        description: 'The email verification token of the user.',
        example: 'abc',
    })
    @Prop({ default: '' })
    emailVerificationToken: string;

    
    @ApiProperty({
        type: Date,
        format: 'date',
        description: 'The date of the email verification token expiration',
    })
    @Prop()
    emailVerificationTokenExpiry: Date;


    @ApiProperty({
        type: Boolean,
        description: 'The email of the user is verified or not.',
        example: 'true or false',
    })
    @Prop({ default: false })
    emailVerified: boolean;


    @ApiProperty({
        type: String,
        description: 'The token for reseting the password of the user when using forgot password.',
        example: 'abc',
    })
    @Prop({ default: '' })
    passwordResetToken: string;


    @ApiProperty({
        type: Date,
        format: 'date',
        description: 'The date of the password reset token expiration',
    })
    @Prop()
    passwordResetTokenExpiry: Date;

}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
