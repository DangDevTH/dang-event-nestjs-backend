"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersModule = void 0;
var common_1 = require("@nestjs/common");
var users_service_1 = require("./providers/users.service");
var users_resolver_1 = require("./users.resolver");
var users_controller_1 = require("./users.controller");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("./entities/user.entity");
var auth_module_1 = require("src/auth/auth.module");
var user_update_provider_1 = require("./providers/user-update.provider");
var user_create_provider_1 = require("./providers/user-create.provider");
var find_one_by_google_id_provider_1 = require("./providers/find-one-by-google-id.provider");
var find_one_by_username_provider_1 = require("./providers/find-one-by-username.provider");
var find_one_by_email_provider_1 = require("./providers/find-one-by-email.provider");
var find_user_by_id_provider_1 = require("./providers/find-user-by-id.provider");
var uploads_module_1 = require("src/uploads/uploads.module");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), common_1.forwardRef(function () { return auth_module_1.AuthModule; }), common_1.forwardRef(function () { return uploads_module_1.UploadsModule; })],
            providers: [
                users_resolver_1.UsersResolver,
                users_service_1.UsersService,
                user_update_provider_1.UserUpdateProvider,
                user_create_provider_1.UserCreateProvider,
                find_one_by_google_id_provider_1.FindOneByGoogleIdProvider,
                find_one_by_username_provider_1.FindOneByUsernameProvider,
                find_one_by_email_provider_1.FindOneByEmailProvider,
                find_user_by_id_provider_1.FindUserByIdProvider,
            ],
            controllers: [users_controller_1.UsersController],
            exports: [users_service_1.UsersService]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
