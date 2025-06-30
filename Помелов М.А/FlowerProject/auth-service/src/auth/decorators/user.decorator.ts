import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../interfaces';

export interface UserRequest extends JwtPayload {}

export const User = createParamDecorator(
  (data: keyof UserRequest | undefined, ctx: ExecutionContext): UserRequest | any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    // Если указано конкретное поле, возвращаем его
    if (data && user) {
      return user[data];
    }
    
    // Иначе возвращаем весь объект пользователя
    return user;
  },
); 