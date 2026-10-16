import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (value === null || value === undefined) {
      return value;
    }

    if (typeof value !== 'object' || Array.isArray(value)) {
      return value;
    }

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object, { forbidUnknownValues: false });

    if (errors.length > 0) {
      const firstError = Object.values(errors[0].constraints || {})[0];
      throw new BadRequestException(firstError || '参数校验失败');
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}