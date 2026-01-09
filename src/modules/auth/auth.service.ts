import { forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/services/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { jwtConstants } from "./constants";
import { JwtPayload } from "./auth.interface";


@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }


    async signIn(name: string, password: string): Promise<{ access_token: string, refresh_token: string }> {
        const user = await this.userService.findOne(name);
        if (!user) {
            throw new UnauthorizedException('Error: User not found');
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            throw new UnauthorizedException('Error: Invalid Password');
        }

        const payload: JwtPayload = {
            sub: user._id.toString(),
            name: user.name
        }

        const access_token = await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
            expiresIn: jwtConstants.expiresIn,
        });

        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
            expiresIn: jwtConstants.refresh_expiresIn,
        });

        return {
            access_token: access_token,
            refresh_token: refresh_token,
        }
    }
}