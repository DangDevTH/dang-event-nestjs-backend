
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

const getcurrentUserฺByContext = (context: ExecutionContext) => {
  if (context.getType<GqlContextType>() === 'graphql') {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  } else if (context.getType() === 'http') {
    const httpRequest = context.switchToHttp().getRequest();
    return httpRequest.user;
  }
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    getcurrentUserฺByContext(context),
);
