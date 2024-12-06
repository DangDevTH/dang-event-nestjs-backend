import { registerEnumType } from "@nestjs/graphql";

export enum RoleType {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SUPERMAN = 'SUPERMAN',
}
registerEnumType(RoleType, { name: 'RoleType'})