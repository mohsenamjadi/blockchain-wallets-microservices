import mongoose from "mongoose";

export class CreateUserData {

    constructor(
      public readonly createdAt: Date,
      public readonly updatedAt: Date,
      public readonly email: string,
      public readonly username: string,
      public readonly password: string,
      public readonly googleId: string,
      public readonly phoneNumber: string,
      public readonly picture: string,
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly roles: string[],
      public readonly companyName: string,
      public readonly companyDescription: string,
      public readonly age: number,
      public readonly country: string,
      public readonly city: string,
      public readonly postalCode: string,
      public readonly walletAddress: string,
      public readonly totalTransactionAmount: number,
      public readonly apiKey: string,
      public readonly acceptedByAdmin: boolean,
      public readonly emailVerificationToken: string,
      public readonly emailVerificationTokenExpiry: Date,
      public readonly emailVerified: boolean,
      public readonly passwordResetToken: string,
      public readonly passwordResetTokenExpiry: Date
      
    ) {}

    toString() {
      return JSON.stringify({
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        email: this.email,
        username: this.username,
        password: this.password,
        googleId: this.googleId,
        phoneNumber: this.phoneNumber,
        picture: this.picture,
        firstName: this.firstName,
        lastName: this.lastName,
        roles: this.roles,
        companyName: this.companyName,
        companyDescription: this.companyDescription,
        age: this.age,
        country: this.country,
        city: this.city,
        postalCode: this.postalCode,
        walletAddress: this.walletAddress,
        totalTransactionAmount: this.totalTransactionAmount,
        apiKey: this.apiKey,
        acceptedByAdmin: this.acceptedByAdmin,
        emailVerificationToken: this.emailVerificationToken,
        emailVerificationTokenExpiry: this.emailVerificationTokenExpiry,
        emailVerified: this.emailVerified,
        passwordResetToken: this.passwordResetToken,
        passwordResetTokenExpiry: this.passwordResetTokenExpiry,
      });
    }
  }
