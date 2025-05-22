import mongoose from "mongoose";

export class CreateUserData {

    constructor(
      public readonly createdAt: Date,
      public readonly updatedAt: Date,
      public readonly email: string,
      public readonly username: string,
      public readonly password: string,
      public readonly roles: string[],
      
    ) {}

    toString() {
      return JSON.stringify({
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        email: this.email,
        username: this.username,
        password: this.password,
        roles: this.roles,
        
      });
    }
  }
