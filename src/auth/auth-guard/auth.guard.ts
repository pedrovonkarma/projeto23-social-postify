import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const token = authorization?.split(' ')[1];
      const data = this.authService.checkeToken(token);
      const user = await this.userService.findOne(Number(data.sub));

      request.user = user;
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}