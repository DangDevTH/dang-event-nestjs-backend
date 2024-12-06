import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizeInputPipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      return this.sanitizeObject(value);
    }

    if (typeof value === 'string') {
      return this.sanitizeString(value);
    }

    return value; // ส่งค่ากลับหากไม่ใช่ Object หรือ String
  }

  /**
   * ตรวจสอบและ sanitize ข้อมูลประเภท Object
   */
  private sanitizeObject(obj: Record<string, any>): Record<string, any> {
    return Object.entries(obj).reduce((acc, [key, val]) => {
      acc[key] = typeof val === 'string' ? this.sanitizeString(val) : val;
      return acc;
    }, {} as Record<string, any>);
  }

  /**
   * ตรวจสอบและ sanitize ข้อมูลประเภท String
   */
  private sanitizeString(input: string): string {
    if (this.containsSqlInjection(input)) {
      throw new BadRequestException(
        'Your input contains potentially unsafe SQL keywords. Please revise your input.',
      );
    }

    if (this.containsInvalidHtml(input)) {
      throw new BadRequestException(
        'Your input contains unsafe or disallowed HTML elements or scripts.',
      );
    }

    return input;
  }

  /**
   * ตรวจจับคำสั่ง SQL Injection
   */
  private containsSqlInjection(input: string): boolean {
    const sqlPattern = /\b(SELECT|UPDATE|DELETE|INSERT|WHERE|DROP|ALTER|EXEC|UNION|--|#)\b/i;
    return sqlPattern.test(input);
  }

  /**
   * ตรวจจับ HTML ที่ไม่ปลอดภัย
   */
  private containsInvalidHtml(input: string): boolean {
    const sanitized = sanitizeHtml(input, {
      allowedTags: [], 
      allowedAttributes: {}, 
    });
  
    return sanitized !== input && /<[a-zA-Z]+( [^>]*)?>/.test(input); // ตรวจจับ tag ที่มี attributes
  }
}
