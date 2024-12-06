"use strict";
exports.__esModule = true;
var crypto_1 = require("crypto");
function generateRandomPassword(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var result = '';
    // สร้างรหัสผ่านโดยสุ่มเลือกตัวอักษรจาก characters
    for (var i = 0; i < length; i++) {
        var randomIndex = crypto_1.randomBytes(1)[0] % charactersLength;
        result += characters[randomIndex];
    }
    return result;
}
// เรียกใช้ฟังก์ชันเพื่อสร้างรหัสผ่านความยาว 32 ตัวอักษร
var randomPassword = generateRandomPassword(16);
console.log('Generated Password:', randomPassword);
