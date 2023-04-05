const http = require('http')
const path = require('path')
const fs = require('fs')
const mime = require('mime-types')

const port = 3000
const publicDir = path.join(__dirname, 'public')

const server = http.createServer((req, res) => {
  let filePath = path.join(publicDir, req.url)

  // перевіряємо, чи шлях починається з publicDir
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' })
    res.write('Forbidden\n')
    res.end()
    return
  }

  // якщо шлях закінчується на "/", додаємо до нього index.html
  if (filePath.endsWith('/')) {
    filePath += 'index.html'
  }

  fs.exists(filePath, (exists) => {
    if (exists) {
      const contentType = mime.lookup(filePath)
      res.writeHead(200, { 'Content-Type': contentType })
      fs.createReadStream(filePath).pipe(res)
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write('404 Not Found\n')
      res.end()
    }
  })
})

server.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`)
})
