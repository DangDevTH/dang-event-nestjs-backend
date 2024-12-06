import { AuthService } from './../providers/auth.service';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { RoleType } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext().req;
    const payload = req.user;

    if (!payload) {
      throw new ForbiddenException('User not authenticated');
    }

    const user = await this.authService.validateRoleUser(payload.email);

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const hasRequiredRoles = requiredRoles.some((role) => user.role === role);
    console.log('User role:', user.role);
    console.log('Has required roles:', hasRequiredRoles);

    if (!hasRequiredRoles) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
