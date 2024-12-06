"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaginationArgsDto = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var PaginationArgsDto = /** @class */ (function () {
    function PaginationArgsDto() {
        this.limit = 10;
        this.skip = 0;
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString(),
        graphql_1.Field()
    ], PaginationArgsDto.prototype, "username");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.Min(0),
        class_validator_1.IsOptional(),
        graphql_1.Field(function () { return graphql_1.Int; }, { nullable: true })
    ], PaginationArgsDto.prototype, "limit");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.Min(0),
        class_validator_1.IsOptional(),
        graphql_1.Field(function () { return graphql_1.Int; }, { nullable: true })
    ], PaginationArgsDto.prototype, "skip");
    PaginationArgsDto = __decorate([
        graphql_1.InputType()
    ], PaginationArgsDto);
    return PaginationArgsDto;
}());
exports.PaginationArgsDto = PaginationArgsDto;
