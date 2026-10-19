import { describe, expect, it } from 'vitest'
import { loginSchema, registerSchema } from '../server/utils/validation'

describe('اعتبارسنجی حساب کاربری', () => {
  it('ثبت‌نام معتبر را می‌پذیرد', () => expect(registerSchema.safeParse({ name: 'فرداد', email: 'fardad@example.com', password: '12345678' }).success).toBe(true))
  it('رمز کوتاه را رد می‌کند', () => expect(registerSchema.safeParse({ name: 'فرداد', email: 'fardad@example.com', password: '123' }).success).toBe(false))
  it('ایمیل نامعتبر را رد می‌کند', () => expect(loginSchema.safeParse({ email: 'bad', password: 'secret' }).success).toBe(false))
})
