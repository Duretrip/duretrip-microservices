import { UserEntity } from '../entities';
import { Prisma } from '@prisma/client';
type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

export class Utils {
  // Exclude keys from user
  static exclude(user: UserEntity, ...keys: any[]) {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }
  // Generic Exclude keys from user or any Entity
  static prismaExclude<T extends Entity, K extends Keys<T>>(
    type: UserEntity,
    omit: K[],
  ) {
    type Key = Exclude<Keys<T>, K>;
    type TMap = Record<Key, true>;
    const result: TMap = {} as TMap;
    for (const key in Prisma[`${type}ScalarFieldEnum`]) {
      if (!omit.includes(key as K)) {
        result[key as Key] = true;
      }
    }
    return result;
  }

  /**
   * generate random string code providing length
   * @param length
   * @param uppercase
   * @param lowercase
   * @param numerical
   */
  static generateRandomCode(
    length: number,
    uppercase = true,
    lowercase = true,
    numerical = true,
  ): string {
    let result = '';
    const lowerCaseAlphabets = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numericalLetters = '0123456789';
    let characters = '';
    if (uppercase) {
      characters += upperCaseAlphabets;
    }
    if (lowercase) {
      characters += lowerCaseAlphabets;
    }
    if (numerical) {
      characters += numericalLetters;
    }
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Generates an alphanumeric string of 11 characters.
   */
  public static randomAlpha() {
    const string = Math.random().toString(36).substring(2, 15);

    return String(string);
  }

  /**
   * Generates a 13-digit random number.
   */
  public static randomNumber() {
    const number = Math.random().toString().substring(2, 15);

    return Number(number);
  }

  /**
   * Generates a 6-digit random number.
   */
  public static otpCode() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    return randomNumber;
  }
}
