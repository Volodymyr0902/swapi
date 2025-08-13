import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class DtoValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory: (
        validationErrors: ValidationError[],
      ): BadRequestException => {
        const errors: string[] = validationErrors
          .map((error) => {
            return error.constraints
              ? Object.values(error.constraints)
              : 'Unknown validation error';
          })
          .flat();

        return new BadRequestException({
          cause: 'Validation failed',
          errors,
        });
      },
    });
  }
}
