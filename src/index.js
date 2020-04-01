const cookieParser = require('cookie-parser')
const express = require('express')
const fs = require('fs')
const importFresh = require('import-fresh')

const constants = require('./constants')
const getCookieOrSetDefault = require('./helpers/getCookieOrSetDefault')

const app = express()

const startApp = async ({ app, constants, cookieParser, express, fs, getCookieOrSetDefault, host, importFresh, port }) => {

  app.use(cookieParser())

  try {
    app.use('/assets', express.static('../dist/assets'))
    app.get('/*', async (request, response, next) => {

      const requestPath = request.path

      const path = requestPath === '/' ? '/home' : requestPath
      const pagePath = `./pages${path}`

      const fileExists = fs.existsSync(pagePath)

      console.log(requestPath)

      if (!fileExists) {
        response.status(404).send('404')
      } else if (requestPath.startsWith('/assets')) {
        return next()
      } else {

        const displayCookie = getCookieOrSetDefault({ ...constants.cookies.display, request, response })
        const instrumentCookie = getCookieOrSetDefault({ ...constants.cookies.instrument, request, response })
        const scaleCookie = getCookieOrSetDefault({ ...constants.cookies.scale, request, response })

        const page = importFresh(pagePath)

        const event = {
          state: {
            display: displayCookie,
            instrument: instrumentCookie,
            scale: scaleCookie
          }
        }

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
  constants,
  cookieParser,
  express,
  fs,
  getCookieOrSetDefault,
  host: constants.server.host,
  importFresh,
  port: constants.server.port
})