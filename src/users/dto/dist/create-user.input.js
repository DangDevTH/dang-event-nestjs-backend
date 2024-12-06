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
exports.CreateUserInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var abstract_entity_1 = require("src/common/database/abstract.entity");
var CreateUserInput = /** @class */ (function (_super) {
    __extends(CreateUserInput, _super);
    function CreateUserInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MaxLength(60),
        class_validator_1.IsOptional(),
        class_validator_1.Matches(/^[a-zA-Z0-9]+$/, {
            message: 'Username can only contain letters and numbers'
        }),
        graphql_1.Field({ nullable: true })
    ], CreateUserInput.prototype, "name");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MaxLength(60),
        class_validator_1.IsOptional(),
        class_validator_1.Matches(/^[a-zA-Z0-9]+$/, {
            message: 'Username can only contain letters and numbers'
        }),
        graphql_1.Field({ nullable: true })
    ], CreateUserInput.prototype, "username");
    CreateUserInput = __decorate([
        graphql_1.InputType('UserInput')
    ], CreateUserInput);
    return CreateUserInput;
}(abstract_entity_1.AbstractEntity));
exports.CreateUserInput = CreateUserInput;
