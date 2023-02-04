import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Employer } from 'src/employers/models/employers.model';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../models/jwt-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: authService.returnJwtExtractor(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(JwtPayload: JwtPayload): Promise<Employer> {
        const employer = await this.authService.validateUser(JwtPayload);

        if (!employer) {
            throw new UnauthorizedException();
        }

        return employer;
    }
}