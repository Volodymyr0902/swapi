import { Injectable, Scope } from '@nestjs/common';
import { SendMailOptions } from 'nodemailer';

@Injectable({ scope: Scope.REQUEST })
export class EmailOptionsBuilderService {
  private emailOptions: SendMailOptions = {};

  setFrom(from: string): EmailOptionsBuilderService {
    this.emailOptions.from = from;
    return this;
  }

  setTo(to: string): EmailOptionsBuilderService {
    this.emailOptions.to = to;
    return this;
  }

  setSubject(subject: string): EmailOptionsBuilderService {
    this.emailOptions.subject = subject;
    return this;
  }

  setHtml(html: string): EmailOptionsBuilderService {
    this.emailOptions.html = html;
    return this;
  }

  build(): SendMailOptions {
    return this.emailOptions;
  }
}
