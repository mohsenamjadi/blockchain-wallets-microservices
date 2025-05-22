import mongoose from "mongoose";

export interface UserUpdateFields {
    email?: string;
    username?: string;
    password?: string;
    roles?: string[];
  }