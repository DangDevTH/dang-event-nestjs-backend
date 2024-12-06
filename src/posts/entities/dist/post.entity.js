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
exports.Post = void 0;
var graphql_1 = require("@nestjs/graphql");
var abstract_entity_1 = require("src/common/database/abstract.entity");
var user_entity_1 = require("src/users/entities/user.entity");
var typeorm_1 = require("typeorm");
var postStatus_enum_1 = require("../enums/postStatus.enum");
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 255
        }),
        graphql_1.Field()
    ], Post.prototype, "content");
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 1024,
            nullable: true
        }),
        graphql_1.Field({ nullable: true })
    ], Post.prototype, "featuredImageUrl");
    __decorate([
        typeorm_1.Column({
            type: "enum",
            "enum": postStatus_enum_1.postStatusType,
            "default": postStatus_enum_1.postStatusType.PUBLISHED
        }),
        graphql_1.Field(function () { return postStatus_enum_1.postStatusType; }, { nullable: true })
    ], Post.prototype, "status");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.posts; }, {
            onDelete: 'CASCADE',
            eager: true
        }),
        graphql_1.Field(function () { return user_entity_1.User; })
    ], Post.prototype, "author");
    __decorate([
        typeorm_1.CreateDateColumn(),
        graphql_1.Field(function () { return Date; })
    ], Post.prototype, "createDate");
    Post = __decorate([
        typeorm_1.Entity(),
        graphql_1.ObjectType()
    ], Post);
    return Post;
}(abstract_entity_1.AbstractEntity));
exports.Post = Post;
