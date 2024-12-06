"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SanitizeInputPipe = void 0;
var common_1 = require("@nestjs/common");
var sanitizeHtml = require("sanitize-html");
var SanitizeInputPipe = /** @class */ (function () {
    function SanitizeInputPipe() {
    }
    SanitizeInputPipe.prototype.transform = function (value) {
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            return this.sanitizeObject(value);
        }
        if (typeof value === 'string') {
            return this.sanitizeString(value);
        }
        return value; // ส่งค่ากลับหากไม่ใช่ Object หรือ String
    };
    /**
     * ตรวจสอบและ sanitize ข้อมูลประเภท Object
     */
    SanitizeInputPipe.prototype.sanitizeObject = function (obj) {
        var _this = this;
        return Object.entries(obj).reduce(function (acc, _a) {
            var key = _a[0], val = _a[1];
            acc[key] = typeof val === 'string' ? _this.sanitizeString(val) : val;
            return acc;
        }, {});
    };
    /**
     * ตรวจสอบและ sanitize ข้อมูลประเภท String
     */
    SanitizeInputPipe.prototype.sanitizeString = function (input) {
        if (this.containsSqlInjection(input)) {
            throw new common_1.BadRequestException('Your input contains potentially unsafe SQL keywords. Please revise your input.');
        }
        if (this.containsInvalidHtml(input)) {
            throw new common_1.BadRequestException('Your input contains unsafe or disallowed HTML elements or scripts.');
        }
        return input;
    };
    /**
     * ตรวจจับคำสั่ง SQL Injection
     */
    SanitizeInputPipe.prototype.containsSqlInjection = function (input) {
        var sqlPattern = /\b(SELECT|UPDATE|DELETE|INSERT|WHERE|DROP|ALTER|EXEC|UNION|--|#)\b/i;
        return sqlPattern.test(input);
    };
    /**
     * ตรวจจับ HTML ที่ไม่ปลอดภัย
     */
    SanitizeInputPipe.prototype.containsInvalidHtml = function (input) {
        var sanitized = sanitizeHtml(input, {
            allowedTags: [],
            allowedAttributes: {}
        });
        return sanitized !== input && /<[a-zA-Z]+( [^>]*)?>/.test(input); // ตรวจจับ tag ที่มี attributes
    };
    SanitizeInputPipe = __decorate([
        common_1.Injectable()
    ], SanitizeInputPipe);
    return SanitizeInputPipe;
}());
exports.SanitizeInputPipe = SanitizeInputPipe;
