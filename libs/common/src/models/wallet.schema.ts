import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ versionKey: false })
export class WalletDocument extends AbstractDocument {
    
    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserDocument' })
    user: mongoose.Types.ObjectId;

    @Prop({ required: true, unique: true })
    privateKey: string;

    @Prop({ required: true, unique: true })
    publicKey: string;

    @Prop({ required: true, unique: true })
    base58: string;

    @Prop({ required: true, unique: true })
    hex: string;

}

export const WalletSchema = SchemaFactory.createForClass(WalletDocument);
