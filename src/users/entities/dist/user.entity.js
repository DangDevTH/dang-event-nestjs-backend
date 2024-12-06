"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_transformer_1 = require("class-transformer");
var abstract_entity_1 = require("src/common/database/abstract.entity");
var typeorm_1 = require("typeorm");
var user_status_enum_1 = require("../enums/user-status.enum");
var role_enum_1 = require("src/auth/enums/role.enum");
var post_entity_1 = require("src/posts/entities/post.entity");
var class_validator_1 = require("class-validator");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 60
        }),
        graphql_1.Field()
    ], User.prototype, "name");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 60,
            unique: true
        }),
        graphql_1.Field()
    ], User.prototype, "username");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 1024,
            nullable: true
        }),
        class_validator_1.IsOptional(),
        graphql_1.Field({ nullable: true })
    ], User.prototype, "profileImage");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 1024,
            nullable: true
        }),
        class_validator_1.IsOptional(),
        graphql_1.Field({ nullable: true })
    ], User.prototype, "backgroundImage");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 100,
            unique: true
        }),
        graphql_1.Field(),
        class_transformer_1.Exclude()
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            nullable: true,
            unique: true
        }),
        graphql_1.Field({ nullable: true }),
        class_transformer_1.Exclude()
    ], User.prototype, "googleId");
    __decorate([
        typeorm_1.Column({
            type: "enum",
            "enum": user_status_enum_1.UserStatusType,
            "default": user_status_enum_1.UserStatusType.ACTIVE
        }),
        graphql_1.Field(function () { return user_status_enum_1.UserStatusType; }, { nullable: true }),
        class_transformer_1.Exclude()
    ], User.prototype, "status");
    __decorate([
        typeorm_1.Column({
            type: "enum",
            "enum": role_enum_1.RoleType,
            "default": role_enum_1.RoleType.USER
        }),
        graphql_1.Field(function () { return role_enum_1.RoleType; }, { nullable: true }),
        class_transformer_1.Exclude()
    ], User.prototype, "role");
    __decorate([
        typeorm_1.OneToMany(function () { return post_entity_1.Post; }, function (post) { return post.author; }),
        graphql_1.Field(function () { return [post_entity_1.Post]; })
    ], User.prototype, "posts");
    __decorate([
        typeorm_1.CreateDateColumn(),
        graphql_1.Field(function () { return Date; })
    ], User.prototype, "createDate");
    __decorate([
        typeorm_1.UpdateDateColumn(),
        graphql_1.Field(function () { return Date; })
    ], User.prototype, "updateDate");
    User = __decorate([
        typeorm_1.Entity(),
        graphql_1.ObjectType()
    ], User);
    return User;
}(abstract_entity_1.AbstractEntity));
exports.User = User;
