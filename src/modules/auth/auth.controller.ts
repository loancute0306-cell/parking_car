import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../user/user.interface";



@ApiTags('Auth APIs')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @ApiOperation({ summary: 'User Sign In' })
    @Post('sign-in')
    async singIn(@Body() dto: CreateUserDto) {
        return this.authService.signIn(dto.name, dto.password);
    }
}