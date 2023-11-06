import { UserEntity } from '../entities';
import { Prisma } from '@prisma/client';
type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>], string>;
export declare class Utils {
    static exclude(user: UserEntity, ...keys: any[]): UserEntity;
    static prismaExclude<T extends Entity, K extends Keys<T>>(type: UserEntity, omit: K[]): Record<Exclude<string, K>, true>;
    static generateRandomCode(length: number, uppercase?: boolean, lowercase?: boolean, numerical?: boolean): string;
    static randomAlpha(): string;
    static randomNumber(): number;
    static otpCode(): number;
}
export {};
