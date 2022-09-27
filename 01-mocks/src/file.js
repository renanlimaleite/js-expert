const { readFile } = require('fs/promises')
const User = require('./user')
// const { join } = require('path')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id','name','profession','age']
}

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath)
    const validation = File.isValid(content)
    
    if (!validation.valid) throw new Error(validation.error)

    const users = File.parseCSVToJSON(content)

    return users
  }

  static async getFileContent(filePath) {
    // __dirname informa o caminho absoluto exato do diretório do arquivo em exec.
    // const filename = join(__dirname, filePath)
    return (await readFile(filePath)).toString('utf-8')
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split('\n')
    
    const isHeaderValid = header === options.fields.join(',')

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    const isContentLengthAccepted = (
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines
    )

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    return { valid: true }
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split('\n')
    // remove o primeiro item e joga na variável
    const firstLine = lines.shift()
    const header = firstLine.split(',')
    const users = lines.map(line => {
      const columns = line.split(',')
      let users = {}
      for(const index in columns) {
        users[header[index]] = columns[index]
      }
      return new User(users)
    })
    return users
  }
}

// (async () => {
//   // const result = await File.csvToJson('../mocks/threeItems-valid.csv')
//   const result = await File.csvToJson('../mocks/fourItems-invalid.csv')
//   // const result = await File.csvToJson('../mocks/header-invalid.csv')
//   console.log('result', result)
// })()

module.exports = File