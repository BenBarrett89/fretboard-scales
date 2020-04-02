const getCookie = name => {
  const cookieName = `${name}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const decodedCookies = decodedCookie.split(';')
  const wholeCookie = decodedCookies
    .find(cookie => {
      const value = cookie.trim()
      return value.indexOf(cookieName) === 0
    })
  return wholeCookie && wholeCookie.substring(wholeCookie.indexOf('='), wholeCookie.length);
}

const checkCookie = () => {
  const display = getCookie('display')
  if (display !== '') {
    alert('Display cookie set and parsed')
  } else {
    alert('Cookie not set...')
  }
}
