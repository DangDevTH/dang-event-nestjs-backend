import { registerEnumType } from "@nestjs/graphql";

export enum postStatusType {
    PRIVATE = 'PRIVATE',
    FOLLOWER = 'FOLLOWER',
    PUBLISHED = 'PUBLISHED',
}

registerEnumType(postStatusType, { name: 'postStatusType'})