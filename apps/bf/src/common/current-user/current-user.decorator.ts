import { User } from "@/user/entities/user.entity";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator((key: string, context: ExecutionContext): User | number => {
    const request = context.switchToHttp().getRequest();
    return key ? request.user[key] : request.user;
});