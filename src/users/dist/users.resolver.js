"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UsersResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var user_entity_1 = require("./entities/user.entity");
var current_user_decorator_1 = require("src/auth/decorators/current-user.decorator");
var auth_decorator_1 = require("src/auth/decorators/auth.decorator");
var auth_type_enum_1 = require("src/auth/enums/auth-type.enum");
var UsersResolver = /** @class */ (function () {
    function UsersResolver(usersService) {
        this.usersService = usersService;
    }
    UsersResolver.prototype.findAll = function () {
        return this.usersService.findAll();
    };
    UsersResolver.prototype.findOne = function (user) {
        console.log('user', user);
        return this.usersService.findById(user.id);
    };
    UsersResolver.prototype.findOneByUsername = function (findUserInput) {
        console.log('findOneByUsername', findUserInput);
        return this.usersService.findOneByUsername(findUserInput.username);
    };
    UsersResolver.prototype.updateUser = function (user, updateUserInput, uploadUserImagesInputDto) {
        return this.usersService.update(user.email, updateUserInput, uploadUserImagesInputDto);
    };
    UsersResolver.prototype.removeUser = function (id) {
        return 0;
    };
    __decorate([
        graphql_1.Query(function () { return [user_entity_1.User]; }, { name: 'users' }),
        auth_decorator_1.Auth(auth_type_enum_1.AuthType.Bearer)
    ], UsersResolver.prototype, "findAll");
    __decorate([
        graphql_1.Query(function () { return user_entity_1.User; }, { name: 'me' }),
        __param(0, current_user_decorator_1.CurrentUser())
    ], UsersResolver.prototype, "findOne");
    __decorate([
        graphql_1.Query(function () { return user_entity_1.User; }, { name: 'username' }),
        __param(0, graphql_1.Args('FindUserInput'))
    ], UsersResolver.prototype, "findOneByUsername");
    __decorate([
        graphql_1.Mutation(function () { return user_entity_1.User; }),
        __param(0, current_user_decorator_1.CurrentUser()),
        __param(1, graphql_1.Args('updateUserInput')),
        __param(2, graphql_1.Args('uploadUserImagesInputDto'))
    ], UsersResolver.prototype, "updateUser");
    __decorate([
        graphql_1.Mutation(function () { return user_entity_1.User; }),
        __param(0, graphql_1.Args('id', { type: function () { return graphql_1.ID; } }))
    ], UsersResolver.prototype, "removeUser");
    UsersResolver = __decorate([
        graphql_1.Resolver(function () { return user_entity_1.User; })
    ], UsersResolver);
    return UsersResolver;
}());
exports.UsersResolver = UsersResolver;
