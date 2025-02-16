"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var database_module_1 = require("./common/database/database.module");
var config_1 = require("@nestjs/config");
var users_module_1 = require("./users/users.module");
var database_config_1 = require("./config/database.config");
var graphql_1 = require("@nestjs/graphql");
var apollo_1 = require("@nestjs/apollo");
var auth_module_1 = require("./auth/auth.module");
var jwt_config_1 = require("./auth/config/jwt.config");
var jwt_1 = require("@nestjs/jwt");
var core_1 = require("@nestjs/core");
var authentication_guard_1 = require("./auth/guards/authentication.guard");
var gql_or_http_auth_guard_1 = require("./auth/guards/gql-or-http-auth.guard");
var posts_module_1 = require("./posts/posts.module");
var uploads_module_1 = require("./uploads/uploads.module");
var app_config_1 = require("./config/app.config");
var environment_validation_1 = require("./config/environment.validation");
var ENV = process.env.NODE_ENV;
console.log('Environment: ', ENV);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: !ENV ? ".env" : ".env." + ENV,
                    load: [database_config_1["default"], app_config_1["default"]],
                    validationSchema: environment_validation_1["default"]
                }),
                graphql_1.GraphQLModule.forRoot({
                    driver: apollo_1.ApolloDriver,
                    autoSchemaFile: true,
                    debug: true,
                    playground: true,
                    csrfPrevention: false
                }),
                config_1.ConfigModule.forFeature(jwt_config_1["default"]),
                jwt_1.JwtModule.registerAsync(jwt_config_1["default"].asProvider()),
                database_module_1.DatabaseModule,
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                posts_module_1.PostsModule,
                uploads_module_1.UploadsModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                {
                    provide: core_1.APP_GUARD,
                    useClass: authentication_guard_1.AuthenticationGuard
                },
                gql_or_http_auth_guard_1.GqlOrHttpAuthGuard,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
