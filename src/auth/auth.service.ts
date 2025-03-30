import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async register(email: string, password: string) {
        const existingUser = await this.usersService.findOne(email);
        if (existingUser) throw new BadRequestException('User already exists');

        const user = await this.usersService.create(email, password);
        return { message: 'User registered successfully', userId: user._id };
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findOne(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = { userId: user._id, email: user.email };
        return { access_token: this.jwtService.sign(payload) };
    }
}
