const isUtf8 = require('is-utf8')
const getTransformer = require('./get-transformer')

module.exports = class Engine {
  constructor(files, metalsmith, options) {
    this.files = files
    this.options = options
    this.metadata = metalsmith.metadata()
    this.source = metalsmith.source()
  }

  render(filename) {
    return new Promise(resolve => {
      // Return early for files without an extension
      if (!filename.includes('.')) {
        return resolve()
      }

      const [base, ...extensions] = filename.split('.')
      const file = this.files[filename]

      // Only transform utf8 content
      if (!isUtf8(file.contents)) {
        return resolve()
      }

      // Return early if there are no transforms
      if (!getTransformer(extensions[extensions.length - 1])) {
        return resolve()
      }

      // Stringify file contents
      file.contents = file.contents.toString()

      // Go through all extensions
      const extLength = extensions.length
      for (let i = 0; i < extLength; i += 1) {
        const ext = extensions.pop()
        const transform = getTransformer(ext)
        const locals = Object.assign({}, this.metadata, file)

        // Stop if the current extension can't be transformed
        if (!transform) {
          extensions.push(ext)
          break
        }

        // If this is the last extension, replace it with a new one
        if (extensions.length === 0) {
          extensions.push(transform.outputFormat)
        }

        // Transform the contents
        file.contents = transform.render(file.contents, this.options, locals).body
      }

      // Store results and delete old file
      file.contents = new Buffer(file.contents)
      this.files[[base, ...extensions].join('.')] = file
      delete this.files[filename]
      return resolve()
    })
  }
}
