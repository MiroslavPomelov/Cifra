import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'Gmail', // или другой SMTP-сервис
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-password-or-app-password',
        },
      },
    }),
  ],
  exports: [MailerModule],
})
export class MailModule {}