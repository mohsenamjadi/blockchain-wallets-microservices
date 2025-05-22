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
        type: [String],
        format: 'array string',
        description: 'The roles of the user.',
    })
    @Prop()
    roles: string[];

}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
