import argon2 from 'argon2'
import { loginSchema } from '../../utils/validation'
import { getDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message || 'اطلاعات واردشده صحیح نیست.' })
  const user = await (await getDb()).collection('users').findOne({ email: parsed.data.email })
  if (!user || !(await argon2.verify(user.passwordHash, parsed.data.password))) throw createError({ statusCode: 401, statusMessage: 'ایمیل یا رمز عبور اشتباه است.' })
  const sessionUser = { id: user._id.toString(), name: user.name as string, email: user.email as string }
  await setUserSession(event, { user: sessionUser }, { maxAge: 60 * 60 * 24 * 30 })
  return { user: sessionUser }
})
