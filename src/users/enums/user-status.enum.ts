import { registerEnumType } from "@nestjs/graphql";

export enum UserStatusType {
    ACTIVE = 'ACTIVE',
    PRIVATE = 'PRIVATE',
    BANNED = 'BANNED',
    INACTIVE = 'INACTIVE',
}

registerEnumType(UserStatusType, { name: 'UserStatusType'})