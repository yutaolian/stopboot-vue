import Cookies from 'js-cookie'

const tokenKey = 'Authorization'

export function getCookies (key) {
  return Cookies.get(key)
}

export function setCookies (key,value) {
  return Cookies.set(key, value)
}

export function removeCookies (key) {
  return Cookies.remove(key)
}





