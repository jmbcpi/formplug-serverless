'use strict'

module.exports.isURL = function (input) {
  let regex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  return regex.test(input)
}

module.exports.isEmail = function (input) {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(input)
}

module.exports.hasRedirect = function (data) {
  if ('_redirect' in data && module.exports.isURL(data['_redirect'])) {
    return true
  }
  return false
}

module.exports.isJsonResponse = function (data) {
  if ('_format' in data && data['_format'].toLowerCase() === 'json') {
    return true
  }
  return false
}
