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
exports.UserUpdateProvider = void 0;
var uploads_service_1 = require("./../../uploads/provider/uploads.service");
var typeorm_1 = require("@nestjs/typeorm");
var common_1 = require("@nestjs/common");
var user_entity_1 = require("../entities/user.entity");
var UserUpdateProvider = /** @class */ (function () {
    function UserUpdateProvider(usersRepository, uploadsService) {
        this.usersRepository = usersRepository;
        this.uploadsService = uploadsService;
    }
    UserUpdateProvider.prototype.updateUser = function (email, updateUserInput, _a) {
        var _b, _c;
        var profileImage = _a.profileImage, backgroundImage = _a.backgroundImage;
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, username, uploadProfileImage, uploadBackgroundImage, error_1, error_2, error_3, error_4, error_5;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        existingUser = undefined;
                        username = undefined;
                        uploadProfileImage = undefined;
                        uploadBackgroundImage = undefined;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.usersRepository.findOneBy({
                                email: email
                            })];
                    case 2:
                        existingUser = _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _d.sent();
                        throw new common_1.RequestTimeoutException('Unable to process your request at the moment. Please try again later');
                    case 4:
                        if (existingUser.email !== email) {
                            throw new common_1.BadRequestException('Invalid user email!');
                        }
                        if (!updateUserInput.username) return [3 /*break*/, 9];
                        _d.label = 5;
                    case 5:
                        _d.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.usersRepository.findOneBy({ username: updateUserInput.username })];
                    case 6:
                        username = _d.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _d.sent();
                        throw new common_1.RequestTimeoutException('Unable to process your request at the moment. Please try again later');
                    case 8:
                        if (username) {
                            throw new common_1.BadRequestException('username already exists');
                        }
                        _d.label = 9;
                    case 9:
                        if (!(profileImage && profileImage !== null)) return [3 /*break*/, 13];
                        _d.label = 10;
                    case 10:
                        _d.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, this.uploadsService.uploadFileUser(profileImage)];
                    case 11:
                        uploadProfileImage = _d.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        error_3 = _d.sent();
                        throw new common_1.RequestTimeoutException('Unable to process your request at the moment. Please try again later1');
                    case 13:
                        if (!(backgroundImage && backgroundImage !== null)) return [3 /*break*/, 17];
                        _d.label = 14;
                    case 14:
                        _d.trys.push([14, 16, , 17]);
                        return [4 /*yield*/, this.uploadsService.uploadFileUser(backgroundImage)];
                    case 15:
                        uploadBackgroundImage = _d.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        error_4 = _d.sent();
                        throw new common_1.RequestTimeoutException('Unable to process your request at the moment. Please try again later1');
                    case 17:
                        existingUser.username = (_b = updateUserInput.username) !== null && _b !== void 0 ? _b : existingUser.username;
                        existingUser.name = (_c = updateUserInput.name) !== null && _c !== void 0 ? _c : existingUser.name;
                        existingUser.profileImage = uploadProfileImage !== null && uploadProfileImage !== void 0 ? uploadProfileImage : existingUser.profileImage;
                        existingUser.backgroundImage = uploadBackgroundImage !== null && uploadBackgroundImage !== void 0 ? uploadBackgroundImage : existingUser.backgroundImage;
                        _d.label = 18;
                    case 18:
                        _d.trys.push([18, 20, , 21]);
                        return [4 /*yield*/, this.usersRepository.save(existingUser)];
                    case 19:
                        _d.sent();
                        return [3 /*break*/, 21];
                    case 20:
                        error_5 = _d.sent();
                        throw new common_1.RequestTimeoutException('Unable to process your request at the moment. Please try again later');
                    case 21: return [2 /*return*/, existingUser];
                }
            });
        });
    };
    UserUpdateProvider = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
        __param(1, common_1.Inject(common_1.forwardRef(function () { return uploads_service_1.UploadsService; })))
    ], UserUpdateProvider);
    return UserUpdateProvider;
}());
exports.UserUpdateProvider = UserUpdateProvider;
