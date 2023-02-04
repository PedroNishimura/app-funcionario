import { Document } from "mongoose";

export interface Employer extends Document {
    name: string;
    password: string;
}