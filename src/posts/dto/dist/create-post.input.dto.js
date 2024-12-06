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
exports.CreatePostInputDto = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var abstract_entity_1 = require("src/common/database/abstract.entity");
var postStatus_enum_1 = require("../enums/postStatus.enum");
var CreatePostInputDto = /** @class */ (function (_super) {
    __extends(CreatePostInputDto, _super);
    function CreatePostInputDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(1),
        class_validator_1.MaxLength(255),
        graphql_1.Field()
    ], CreatePostInputDto.prototype, "content");
    __decorate([
        class_validator_1.IsEmpty(),
        class_validator_1.IsString(),
        class_validator_1.MaxLength(1024),
        class_validator_1.IsOptional(),
        graphql_1.Field({ nullable: true })
    ], CreatePostInputDto.prototype, "featuredImageUrl");
    __decorate([
        class_validator_1.IsEnum(postStatus_enum_1.postStatusType),
        class_validator_1.IsEmpty(),
        class_validator_1.IsOptional(),
        graphql_1.Field(function () { return postStatus_enum_1.postStatusType; }, { nullable: true })
    ], CreatePostInputDto.prototype, "status");
    CreatePostInputDto = __decorate([
        graphql_1.InputType()
    ], CreatePostInputDto);
    return CreatePostInputDto;
}(abstract_entity_1.AbstractEntity));
exports.CreatePostInputDto = CreatePostInputDto;
