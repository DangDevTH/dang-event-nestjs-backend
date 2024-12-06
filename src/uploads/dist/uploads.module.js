"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadsModule = void 0;
var common_1 = require("@nestjs/common");
var uploads_service_1 = require("./provider/uploads.service");
var uploads_provider_1 = require("./provider/uploads.provider");
var users_module_1 = require("src/users/users.module");
var UploadsModule = /** @class */ (function () {
    function UploadsModule() {
    }
    UploadsModule = __decorate([
        common_1.Module({
            imports: [common_1.forwardRef(function () { return users_module_1.UsersModule; }),],
            providers: [uploads_service_1.UploadsService, uploads_provider_1.UploadsProvider],
            exports: [uploads_service_1.UploadsService]
        })
    ], UploadsModule);
    return UploadsModule;
}());
exports.UploadsModule = UploadsModule;
