import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

type JwtCookiePayload = {
  sub: string;
  username: string;
  name?: string;
  role?: string;
  roles?: string[];
};

type AuthenticatedRequest = Request & {
  user?: {
    id: string;
    username: string;
    name?: string;
    role?: string;
    roles?: string[];
  };
};

@Injectable()
export class JwtCookieGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.getTokenFromCookies(request);

    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtCookiePayload>(token);

      request.user = {
        id: payload.sub,
        username: payload.username,
        name: payload.name,
        role: payload.role,
        roles: payload.roles,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  private getTokenFromCookies(request: Request): string | undefined {
    const cookieHeader = request.headers.cookie;

    if (!cookieHeader) {
      return undefined;
    }

    const cookies = cookieHeader.split(';').reduce<Record<string, string>>(
      (parsedCookies, cookie) => {
        const [rawName, ...rawValue] = cookie.trim().split('=');

        if (!rawName) {
          return parsedCookies;
        }

        parsedCookies[rawName] = decodeURIComponent(rawValue.join('='));
        return parsedCookies;
      },
      {},
    );

    return cookies.access_token;
  }
}
