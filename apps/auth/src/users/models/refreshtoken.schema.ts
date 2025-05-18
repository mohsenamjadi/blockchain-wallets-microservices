import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ versionKey: false })
export class RefreshTokenDocument extends AbstractDocument {
    
    @Prop({ type: mongoose.Types.ObjectId, ref: 'UserDocument' })
    user: mongoose.Types.ObjectId;
    
    @Prop()
    refreshToken: string;

    @Prop()
    refreshTokenExpiresAt: Date;

}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenDocument);
