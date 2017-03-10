const fs = require('fs')

function exist(path) {
  try {
    const stat = fs.lstatSync(path)
    return true
  } catch (err) {
    return false
  }
}

module.exports = path => {
  if (!exist(path)) {
    return []
  }
  const dirs = fs.readdirSync(path)
  return dirs
}
