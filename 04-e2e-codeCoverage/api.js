const http = require('http')

const DEFAULT_USER = { username: 'ErickWendel', password: '123' }

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    return response.end()
  },
  '/login:post': async (request, response) => {
    // repsonse é um iterator
    for await (const data of request) {
      const user = JSON.parse(data)
      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401)
        response.write('Logging failed!')
        return response.end()
      }
    }
    
    response.write('Logging has succeeded!')
    return response.end()
  },
  default: (request, response) => {
    response.write('Not Found, :D')
    return response.end()
  }
}

const handler = function(request, response) {
  const { url, method } = request
  const routeKey = `${url}:${method.toLowerCase()}`
  console.log({routeKey})
  const chosen = routes[routeKey] || routes.default
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  return chosen(request, response)
}

const app = http.createServer(handler)
                .listen(3000, () => console.log('app running at', 3000))

module.exports = app