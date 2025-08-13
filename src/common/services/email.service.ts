import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailOptions, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { GeneralResponseDto } from '../dto/general-response.dto';

@Injectable()
export class EmailService {
  private mailTransporter: Transporter;

  constructor(configService: ConfigService) {
    this.mailTransporter = nodemailer.createTransport({
      host: configService.getOrThrow<string>('SMTP_HOST'),
      port: configService.getOrThrow<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: configService.getOrThrow<string>('SMTP_USER'),
        pass: configService.getOrThrow<string>('SMTP_PASSWORD'),
      },
    });
  }

  async sendMailOrFail(
    options: SendMailOptions,
  ): Promise<GeneralResponseDto> | never {
    try {
      await this.mailTransporter.sendMail(options);
      return { success: true };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('', 'Failed to send an email');
    }
  }
}
