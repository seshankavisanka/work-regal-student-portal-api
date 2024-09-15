import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
import { PermissionGuard } from './permission.guard';

export function Auth() {
  return applyDecorators(UseGuards(AuthorizationGuard, PermissionGuard));
}
