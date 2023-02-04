import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Employer } from 'src/employers/models/employers.model';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployersService {
  constructor(
    @InjectModel('Employer')
    private readonly employerModel: Model<Employer>,
    private readonly authService: AuthService
  ) {}

  public async signUp(signUpDto: SignUpDto): Promise<Employer> {
    const employer = new this.employerModel(signUpDto);

    return employer.save();
  }

  public async signIn(signInDto: SignInDto): Promise<{ name: string; jwtToken: string; }> {
    const employer = await this.findByName(signInDto.name);

    await this.checkPassword(signInDto.password, employer);

    const jwtToken = await this.authService.createAccessToken(employer._id);

    return {name: employer.name, jwtToken};
  }

  public async findAll(): Promise<Employer[]> {
    return this.employerModel.find();
  }

  private async findByName(name: string): Promise<Employer> {
    const employer = await this.employerModel.findOne({name});

    if (!employer) {
      throw new NotFoundException('Nome não encontrado');
    }

    return employer;
  }

  private async checkPassword(password: string, employer: Employer): Promise<boolean> {
    const match = await bcrypt.compare(password, employer.password);

    if (!match) {
      throw new NotFoundException('Senha errada');
    }

    return match;
  }

  public async deleteAll() {
    await this.employerModel.deleteMany();

    return true
  }
}
