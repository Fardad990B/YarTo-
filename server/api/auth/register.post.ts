import argon2 from 'argon2'
import { registerSchema } from '../../utils/validation'
import { getDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = registerSchema.safeParse(body)
  if (!parsed.success) throw createError({ statusCode: 400, statusMessage: parsed.error.issues[0]?.message || 'اطلاعات واردشده صحیح نیست.' })
  const db = await getDb()
  const { name, email, password } = parsed.data
  const existing = await db.collection('users').findOne({ email }, { projection: { _id: 1 } })
  if (existing) throw createError({ statusCode: 409, statusMessage: 'این ایمیل قبلاً ثبت شده است.' })
  const passwordHash = await argon2.hash(password, { type: argon2.argon2id })
  const result = await db.collection('users').insertOne({ name, email, passwordHash, createdAt: new Date(), timezone: 'Asia/Tehran' })
  const user = { id: result.insertedId.toString(), name, email }
  await setUserSession(event, { user }, { maxAge: 60 * 60 * 24 * 30 })
  return { user }
})
