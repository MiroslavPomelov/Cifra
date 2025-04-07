import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class ProductsRoleGuard implements CanActivate {
  constructor(private reflector: Reflector){} 
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userId = request.params.id;

    if (!userId) {
      throw new UnauthorizedException('No User ID provided');
    }
    try {
      const response = await fetch(`http://localhost:3000/users/:${userId}`);

      if (!response.ok) {
       throw new UnauthorizedException(`Failed to fetch user with ID ${userId}`);
      }

      const user = await response.json();
      if(!user || !user.role){
        throw new UnauthorizedException('User or role not found');
      }

      return roles.includes(user.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
      throw new UnauthorizedException('Unable to verify user role');
    }      
  }  
}
 