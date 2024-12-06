"use strict";
exports.__esModule = true;
exports.RoleType = void 0;
var graphql_1 = require("@nestjs/graphql");
var RoleType;
(function (RoleType) {
    RoleType["USER"] = "USER";
    RoleType["ADMIN"] = "ADMIN";
    RoleType["SUPERMAN"] = "SUPERMAN";
})(RoleType = exports.RoleType || (exports.RoleType = {}));
graphql_1.registerEnumType(RoleType, { name: 'RoleType' });
