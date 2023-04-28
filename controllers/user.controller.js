const { read, write } = require('../utils/model')
const userController = {
  GET: (req, res) => {
    const data = read('users')
    const todos = read('todos')
    const { id, todo } = req.query
    console.log(todo);

    try {
      const filtered = data.filter(user => user.id == id)
      const filteredTodos = todos.filter(todo => todo.userId == id)
      const findedId = data.find(user => user.id == id)
      if (id && !findedId) {
        throw new Error("user not found")
      }

      if (id && todo == undefined) {
        res.json(200, filtered)
      } else if (id && todo == "") {
        res.json(200, filteredTodos)
      } else {
        res.json(200, data)
      }
    } catch (error) {
      res.json(400, { status: 400, message: error.message })
    }
  },
  POST: async (req, res) => {
    let { username, age } = await req.body
    const users = read('users')
    try {
      let user = users.find(user => user.username == username && user.age == age)

      if (user) throw new Error('this user already exist')

      const newUser = {
        id: users.at(-1).id + 1 || 1,
        username, age
      }
      users.push(newUser)
      write('users', users)
      res.json(201, { status: 201, success: true, data: newUser })
    } catch (error) {
      res.json(400, { status: 400, message: error.message })
    }

  },
  PUT: async (req, res) => {
    let { id, username, age } = await req.body
    const users = read('users')
    try {
      let user = users.find(user => user.id == id)

      if (!user) throw new Error('user not found')

      user.username = username || user.username
      user.age = age || user.age
      write('users', users)
      res.json(200, { status: 200, success: true })
    } catch (error) {
      res.json(400, { status: 400, message: error.message })
    }

  },
  DELETE: async (req, res) => {
    let { id } = await req.body
    const users = read('users')
    try {
      let userIndex = users.findIndex(user => user.id == id)

      if (userIndex == -1) throw new Error('user not found')

      const [deleteUser] = users.splice(userIndex,1)
      write('users', users)
      res.json(204, { status: 204, success: true })
    } catch (error) {
      res.json(400, { status: 400, message: error.message })
    }

  },

}

module.exports = userController