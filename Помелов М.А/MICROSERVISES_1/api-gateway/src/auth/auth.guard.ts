import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // request
    return this.validateRequest(request);
    // return true;
  }

  async validateRequest(request: Request): Promise<boolean> {
    try {
      const headers: IncomingHttpHeaders = request.headers;
      const token: string = headers.authorization;

      // const targetEndPoint: string = request.path.split('/')[1];
      // console.log(targetEndPoint + 'targetEndPoint')
      // if (targetEndPoint == 'login') {
      //   try {
      //     const response: Response = await fetch('http://a-service:3000/login', {
      //       method: 'POST',
      //       headers: {
      //         'Content-type': 'application/json'
      //       },
      //       body: JSON.stringify(request.body)
      //     });
      //     const data = await response.json();
      //     const role: string = data.role;
      //     request.headers.authorization = response.headers.get('Authorization'); // Либо с большой либо с маленькой

      //     return true;
      //   } catch (error) {
      //     console.log(`Api gateway login route error: `, error);
      //     return false;
      //   }
      // }

      // TODO: дописать
      // if (targetEndPoint == 'registration') {
      //   const response: Response = await fetch('http://a-service:3000/registration', {
      //     method: 'POST',
      //     headers: {
      //       'Content-type': 'application/json'
      //     },
      //     body: JSON.stringify(request.body)
      //   });
      //   const data = await response.json();
      //   const role: string = data.role;
      //   request.headers.authorization = response.headers.get('Authorization'); // Либо с большой либо с маленькой
      //   return true;
      // }

      if (!token) return false;

      console.log('Зашли в проверку, токен есть')



      // TODO: дописать
      const response: Response = await fetch('http://a-service:3000/checkToken', {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      });
      console.log('Статус ответа от проверки токена:')
      console.log(response.status)
      if (response.status == 200) {
        return true;
      } else false;


    }
    catch (error) {
      console.log(`Api gateway validationRequest error: `, error);
      return false;
    }

  }

  // private async loginRoute(request: Request) {

  // }
}
