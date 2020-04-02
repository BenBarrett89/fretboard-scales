module.exports = ({ name, defaultValue, request, response }) => {
  let cookie = request.cookies[name] && JSON.parse(request.cookies[name])
  if (!cookie) {
    cookie = defaultValue
    response.cookie(name, JSON.stringify(cookie))
  }
  return cookie
}
