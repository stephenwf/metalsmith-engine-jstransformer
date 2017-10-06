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
    const [base, ...extensions] = filename.split('.')
    const file = this.files[filename]

    // Only transform utf8 content
    if (!isUtf8(file.contents)) {
      return Promise.resolve()
    }

    // Return early if there are no transforms
    if (!getTransformer(extensions[extensions.length - 1])) {
      return Promise.resolve()
    }

    // See which extensions should be transformed
    // See what the new filename would be
    // Stringify contents
    // Run all transforms
    // Convert contents back to buffer
  }
}
