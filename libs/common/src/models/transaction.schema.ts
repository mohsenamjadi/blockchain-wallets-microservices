import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ versionKey: false })
export class TransactionDocument extends AbstractDocument {
    
    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserDocument' })
    user: mongoose.Types.ObjectId;

    @Prop()
    orderId: string;

    @Prop()
    email: string;

    @Prop()
    price: number;

    @Prop()
    companyName: string;

    @Prop()
    apiKey: string;

    @Prop({ required: true, unique: true })
    privateKey: string;

    @Prop({ required: true, unique: true })
    publicKey: string;

    @Prop({ required: true, unique: true })
    base58: string;

    @Prop({ required: true, unique: true })
    hex: string;

    @Prop()
    isPaid: boolean;

    @Prop()
    isUnderPaid?: boolean;

    @Prop()
    isOverPaid?: boolean;

    @Prop()
    isConfirmed: boolean;

    @Prop()
    isExpired: boolean;

    @Prop()
    isCanceled: boolean;
    
    @Prop()
    isTransferedToMain: boolean;

    @Prop()
    isTransferedToMerchant: boolean;

    @Prop()
    balance: number;

    @Prop()
    underPaidBalance?: number;

    @Prop()
    overPaidBalance?: number;

    @Prop()
    transactionHash: string;

    @Prop()
    isTransferedToMainTransactionHash: string;

}

export const TransactionSchema = SchemaFactory.createForClass(TransactionDocument);
