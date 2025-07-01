import { plainToClass } from 'class-transformer';
import { Logger } from '@nestjs/common';

export function validateAndTransformDto<T>(
  DtoClass: new (...args: any[]) => T,
  data: any,
  allowedFields: string[],
  logger?: Logger
): T {
  const receivedFields = Object.keys(data);
  const extraFields = receivedFields.filter(field => !allowedFields.includes(field));

  if (extraFields.length > 0) {
    if (logger) {
      logger.warn(`Попытка передачи недопустимых полей: ${extraFields.join(', ')}`);
    }
    throw new Error(`Недопустимые поля: ${extraFields.join(', ')}`);
  }

  return plainToClass(DtoClass, data);
} 