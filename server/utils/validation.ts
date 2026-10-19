import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'نام باید حداقل ۲ حرف باشد.').max(80, 'نام طولانی است.'),
  email: z.string().trim().toLowerCase().email('ایمیل واردشده معتبر نیست.'),
  password: z.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد.').max(128, 'رمز عبور بیش از حد طولانی است.')
})
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('ایمیل واردشده معتبر نیست.'),
  password: z.string().min(1, 'رمز عبور را وارد کنید.')
})
