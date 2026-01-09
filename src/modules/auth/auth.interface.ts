export interface JwtPayload {
    sub: string;
    name: string;
}

export class signInDto {
    name: string;
    password: string;

}