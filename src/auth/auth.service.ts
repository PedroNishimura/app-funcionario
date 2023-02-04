import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Employer } from 'src/employers/models/employers.model';
import { sign } from 'jsonwebtoken';
import { Request } from 'express';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Employer')
    private readonly employerModel: Model<Employer>
  ) {}

  public async createAccessToken(employerId: string): Promise<string> {
    return sign({ employerId }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP});
  }

  public async validateUser(jwtPayload: JwtPayload): Promise<Employer> {
    const employer = await this.employerModel.findOne({ _id: jwtPayload.employerId });

    if (!employer) {
      throw new UnauthorizedException('User incorrect');
    }

    return employer;
  }

  private jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Bad request');
    }

    const [, token] = authHeader.split(' ');

    return token;
  }

  public returnJwtExtractor(): (request: Request) => string {
    return this.jwtExtractor;
  }
}
