import { Document } from "mongoose";

export interface Employer extends Document {
    userName: string;
    password: string;
}