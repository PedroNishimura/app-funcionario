import { Body, Controller, Post, Get, Delete, UseGuards } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { SignUpDto } from './dto/signUp.dto';
import { Employer } from './models/employers.model';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Post('signUp')
  public async signUp(@Body() signUpDto: SignUpDto): Promise<Employer> {
    return this.employersService.signUp(signUpDto);
  }

  @Post('signIn')
  public async signIn(@Body() signInDto: SignInDto): Promise<{ name: string; jwtToken: string; }> {
    return this.employersService.signIn(signInDto);
  }

  @Get('findAll')
  @UseGuards(AuthGuard('jwt'))
  public async findAll(): Promise<Employer[]> {
    return this.employersService.findAll();
  }

  @Delete('deleteAll')
  @UseGuards(AuthGuard('jwt'))
  public async deleteAll(){
    return this.employersService.deleteAll();
  }
}
