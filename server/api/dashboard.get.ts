import { getDb } from '../utils/db'
import { requireUser } from '../utils/require-user'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const db = await getDb()
  const [tasksToday, upcoming] = await Promise.all([
    db.collection('tasks').countDocuments({ userId: user.id, dueDate: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lt: new Date(new Date().setHours(24, 0, 0, 0)) } }),
    db.collection('tasks').find({ userId: user.id, dueDate: { $gte: new Date() }, completedAt: null }).sort({ dueDate: 1 }).limit(5).toArray()
  ])
  return { user, tasksToday, upcoming: upcoming.map((task) => ({ id: task._id.toString(), title: task.title, dueDate: task.dueDate })) }
})
