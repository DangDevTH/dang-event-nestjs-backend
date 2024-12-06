"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthenticationGuard = void 0;
var common_1 = require("@nestjs/common");
var auth_type_enum_1 = require("../enums/auth-type.enum");
var auth_decorator_1 = require("../decorators/auth.decorator");
var AuthenticationGuard = /** @class */ (function () {
    function AuthenticationGuard(reflector, gqlAuthGuard) {
        var _a;
        this.reflector = reflector;
        this.gqlAuthGuard = gqlAuthGuard;
        this.authTypeGuardMap = (_a = {},
            _a[auth_type_enum_1.AuthType.Bearer] = this.gqlAuthGuard,
            _a[auth_type_enum_1.AuthType.None] = { canActivate: function () { return true; } },
            _a);
    }
    AuthenticationGuard_1 = AuthenticationGuard;
    AuthenticationGuard.prototype.canActivate = function (context) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var authTypes, guards, error, _i, guards_1, instance, canActivate;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        authTypes = (_a = this.reflector.getAllAndOverride(auth_decorator_1.AUTH_TYPE_KEY, [context.getHandler(), context.getClass()])) !== null && _a !== void 0 ? _a : [AuthenticationGuard_1.defaultAuthType];
                        guards = authTypes.map(function (type) { return _this.authTypeGuardMap[type]; }).flat();
                        error = new common_1.UnauthorizedException();
                        _i = 0, guards_1 = guards;
                        _b.label = 1;
                    case 1:
                        if (!(_i < guards_1.length)) return [3 /*break*/, 4];
                        instance = guards_1[_i];
                        return [4 /*yield*/, Promise.resolve(instance.canActivate(context))["catch"](function (err) {
                                error = err;
                            })];
                    case 2:
                        canActivate = _b.sent();
                        if (canActivate) {
                            return [2 /*return*/, true];
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: throw error;
                }
            });
        });
    };
    var AuthenticationGuard_1;
    AuthenticationGuard.defaultAuthType = auth_type_enum_1.AuthType.Bearer;
    AuthenticationGuard = AuthenticationGuard_1 = __decorate([
        common_1.Injectable()
    ], AuthenticationGuard);
    return AuthenticationGuard;
}());
exports.AuthenticationGuard = AuthenticationGuard;
