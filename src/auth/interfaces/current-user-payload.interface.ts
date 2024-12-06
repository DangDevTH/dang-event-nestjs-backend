import { RoleType } from "../enums/role.enum";

export interface CurrentUserPayload {
    id: string;
    email: string;
}

export interface CurrentUserRolePayload {
    id: string;
    email: string;
    role: RoleType;
}