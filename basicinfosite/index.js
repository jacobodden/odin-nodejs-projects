const http = require('http')
const url = require('url')
const fs = require('fs')

const routes = new Map([
  ['/', '/index.html'],
  ['/about', '/about.html'],
  ['/contact-me', '/contact-me.html'],
])

http.createServer((req, res) => {
  const q = url.parse(req.url, true)
  const page = `${__dirname}/${routes.get(q.path) || '404.html'}`
  let isErrorPage = false

  fs.readFile(page, (err, data) => {
    if(err) {
      res.writeHead(404, {'Content-Type': 'text/html'})
      return res.end('404 not fonud')
    }

    if (isErrorPage) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.write(data)
      return res.end('404 not fonud')
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      return res.end()
    }
  })
}).listen(8080)