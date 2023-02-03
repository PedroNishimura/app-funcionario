import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployerSchema } from './schemas/employers.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Employer',
        schema: EmployerSchema
      }
    ]),
    AuthModule,
  ],
  controllers: [EmployersController],
  providers: [EmployersService]
})
export class EmployersModule {}
