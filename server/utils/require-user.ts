export async function requireUser(event: Parameters<typeof getUserSession>[0]) {
  const session = await getUserSession(event)
  const user = session.user as unknown as { id?: string; name?: string; email?: string } | undefined
  if (!user?.id) throw createError({ statusCode: 401, statusMessage: 'برای ادامه وارد حساب شوید.' })
  return user as { id: string; name: string; email: string }
}
