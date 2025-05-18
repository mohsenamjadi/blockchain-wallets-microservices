import mongoose from 'mongoose';

export class CreateRefreshTokenData {
  user: mongoose.Types.ObjectId;

    constructor(
      user: mongoose.Types.ObjectId,
      public readonly refreshToken: string,
      public readonly refreshTokenExpiresAt: Date,
    ) {
      this.user = user;
    }
  
    toString() {
      return JSON.stringify({
        refreshToken: this.refreshToken,
        refreshTokenExpiresAt: this.refreshTokenExpiresAt,
      });
    }
  }
