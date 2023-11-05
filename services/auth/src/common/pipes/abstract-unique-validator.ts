import {
  ValidationArguments,
  ValidatorConstraintInterface
} from 'class-validator';
import { Connection, EntitySchema, FindConditions, ObjectType } from 'typeorm';

/**
 * unique validation arguments
 */
export interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: [
    ObjectType<E> | EntitySchema<E> | string,
    ((validationArguments: ValidationArguments) => FindConditions<E>) | keyof E
  ];
  value: string;
  targetName: string;
  object: {
    username: string;
  },
  property: string;
}

interface CustomUniqueValidationArguments<E>
  extends UniqueValidationArguments<E> {
  property: string;
}

/**
 * abstract class to validate unique
 */
export abstract class AbstractUniqueValidator
  implements ValidatorConstraintInterface {
  protected constructor(protected readonly connection: Connection) { }

  /**
   * validate method to validate provided condition
   * @param value
   * @param args
   */

  public async validate<E>(
    value: string,
    args: CustomUniqueValidationArguments<E>
  ) {
    const [EntityClass, findCondition = args.property] = args.constraints;
    return (
      (await this.connection.getRepository(EntityClass).count({
        where:
          typeof findCondition === 'function'
            ? findCondition(args)
            : {
              [findCondition || args.property]: value
            }
      })) <= 0
    );
  }

  /**
   * default message
   * @param args
   */
  public defaultMessage(args: ValidationArguments) {
    return `${args.property} '${args.value}' already exists`;
  }
}
