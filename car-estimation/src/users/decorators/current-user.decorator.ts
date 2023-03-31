import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const { currentUser } = context.switchToHttp().getRequest();
    return currentUser;
  },
);
