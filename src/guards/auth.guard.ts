/* eslint-disable prettier/prettier */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IncomingHttpHeaders } from 'http';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector, private jwtService: JwtService, private readonly userService: UserService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        if (!token) return false;
        
        const decoded = this.jwtService.decode(token);
        const { dataValues } = await this.userService.findUserByEmail(decoded.email);
        request['user'] = dataValues;
        
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = (request.headers as unknown as IncomingHttpHeaders).authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
