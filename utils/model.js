const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

function read(fileName) {
  const data = readFileSync(resolve('database', fileName + '.json'), 'utf-8')
  return JSON.parse(data)
}

function write(fileName, data) {
  writeFileSync(resolve('database', fileName + '.json'), JSON.stringify(data, null, 4))
  return true
}

module.exports = {
  read, write
}