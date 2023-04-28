const { read, write } = require('../utils/model')
const todoController = {
  GET: (req, res) => {
    const data = read('todos')
    let { id, userId, completed } = req.query
    completed = completed == 'true' ? completed = true : completed = false
    console.log(completed);
    try {
      const filterUserId = data.filter(todo => todo.userId == userId)
      const filterCompleted = data.filter(todo => todo.completed == completed)
      const filtered = data.filter(todo => todo.id == id)
      const findedId = data.find(todo => todo.id == id)
      const findedUserId = data.find(todo => todo.userId == userId)
      if (userId) {
        res.json(200, filterUserId)
        return
      }
      if (completed) {
        res.json(200, filterCompleted)
        return
      }
      if (id && !findedId) {
        throw new Error("todo not found")
      }
      if (userId && !findedUserId) {
        throw new Error("user not found")
      }
      if (filtered.length) {
        res.json(200, filtered)
      } else {
        res.json(200, data)
      }
    } catch (error) {
      res.json(400, { status: 400, message: error.message })
    }
  },
  POST: async (req, res) => {
    let { userId, title, completed } = await req.body
    const todos = read('todos')
    try {
      let todo = todos.find(todo => todo.title == title)

      if (todo) throw new Error('this todo already exist')

      const newTodo = {
        userId,
        id: todos.at(-1).id + 1 || 1,
        title, completed
      }
      todos.push(newTodo)
      write('todos', todos)
      res.json(201, { status: 201, success: true })
    } catch (error) {
      res.json(400, { status: 400, message: error.message })
    }
  },
  PUT: async (req, res) => {
    let { id, title, completed } = await req.body
    const todos = read('todos')
    try {
      let todo = todos.find(todo => todo.id == id)

      if (!todo) throw new Error('todo not found')

      todo.title = title || todo.title
      todo.completed = completed || todo.completed
      write('todos', todos)
      res.json(200, { status: 200, success: true })
    } catch (error) {
      res.json(400, { status: 400, message: error.message })
    }

  },
  DELETE: async (req, res) => {
    let { id } = await req.body
    const todos = read('todos')
    try {
      let todoIndex = todos.findIndex(todo => todo.id == id)

      if (todoIndex == -1) throw new Error('todo not found')

      const [deleteTodo] = todos.splice(todoIndex, 1)
      write('todos', todos)
      res.json(204, { status: 204, success: true })
    } catch (error) {
      res.json(400, { status: 400, message: error.message })
    }

  },

}

module.exports = todoController