'use strict'

const fs = require('fs')
const path = require('path')

const utilityLog = require('../utility/log')
const httpValidation = require('./validation')

module.exports.build = function (statusCode, message, data) {
  if (httpValidation.isJsonResponse(data)) {
    return buildJsonResponse(statusCode, message, data)
  }
  return buildHtmlResponse(statusCode, message, data)
}

function buildJsonResponse (statusCode, message, data) {
  let response = {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      statusCode: statusCode,
      message: message
    })
  }
  return response
}

function buildHtmlResponse (statusCode, message, data) {
  let response = {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'text/html'
    },
    body: generateView(message)
  }
  if (statusCode === 302) {
    response.headers.Location = data['_redirect']
  }
  return response
}

function generateView (message) {
  try {
    let template = fs.readFileSync(path.resolve(__dirname, 'template.html')).toString()
    message = template.replace('{{ message }}', message)
  } catch (error) {
    utilityLog.error(error.message)
  }
  return message
}
