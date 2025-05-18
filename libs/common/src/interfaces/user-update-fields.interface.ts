import mongoose from "mongoose";

export interface UserUpdateFields {
    email?: string;
    username?: string;
    password?: string;
    googleId?: string;
    phoneNumber?: string;
    picture?: string;
    firstName?: string;
    lastName?: string;
    roles?: string[];
    companyName?: string;
    companyDescription?: string;
    age?: number;
    country?: string;
    city?: string;
    postalCode?: string;
    walletAddress?: string;
    totalTransactionAmount?: number;
    apiKey?: string;
    acceptedByAdmin?: boolean;
    emailVerificationToken?: string;
    emailVerificationTokenExpiry?: Date;
    emailVerified?: boolean;
    passwordResetToken?: string;
    passwordResetTokenExpiry?: Date;
  }