const express = require('express')
const fs = require('fs')
const importFresh = require('import-fresh')

const HOST = 'localhost'
const PORT = 5000

const app = express()

const startApp = async ({ app, fs, host, importFresh, port }) => {

  try {
    app.get('/*', async (request, response) => {

      const requestPath = request.path
      const path = requestPath === '/' ? '/home' : requestPath
      const pagePath = `./pages${path}`

      const fileExists = fs.existsSync(pagePath)

      if (!fileExists) response.status(404).send('404')
      else {
        const page = importFresh(pagePath)

        const event = {}

        const {
          body,
          headers,
          statusCode
        } = await page.handler({ event })

        response
          .set(headers)
          .status(statusCode)
          .send(body)
      }
    })

    app.listen(port, host)
    console.log(`Listening on port ${port}`)
  } catch (error) {
    console.log(error)
  }
}

startApp({
  app,
  fs,
  host: HOST,
  importFresh,
  port: PORT
})