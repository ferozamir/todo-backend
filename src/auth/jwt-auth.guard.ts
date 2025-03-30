import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            console.error('JWT Auth Error:', err, info); // Log error for debugging
            throw new UnauthorizedException('Unauthorized: Invalid or expired token');
        }
        return user;
    }
}
