
const http = require('http')
const Express = require('./lib/express')
const PORT = process.env.PORT || 5000

const userController = require('./controllers/user.controller')
const todoController = require('./controllers/todos.controller')

function httpServer(req, res) {
  const app = new Express(req, res)


  app.get('/users', userController.GET)
  app.post('/users', userController.POST)
  app.put('/users', userController.PUT)
  app.delete('/users', userController.DELETE)

  app.get('/todos', todoController.GET)
  app.post('/todos', todoController.POST)
  app.put('/todos', todoController.PUT)
  app.delete('/todos', todoController.DELETE)

}

http.createServer(httpServer).listen(PORT, () => console.log('server is running'))


