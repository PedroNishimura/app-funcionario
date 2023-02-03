import { Schema } from "mongoose";
import * as bcrypt from 'bcrypt';

export const EmployerSchema = new Schema({
  userName: {
    type: String
  },
  password: {
    type: String
  }
});

EmployerSchema.pre('save', async function(next: (err? : Error) => void) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
  
    this['password'] = await bcrypt.hash(this['password'], 10);
  } catch (err) {
    return next(err);
  }
})