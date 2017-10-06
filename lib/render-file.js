const extend = require('extend')
const isUtf8 = require('is-utf8')
const getTransformer = require('./get-transformer')

/**
 * Renders file with all available transformers
 */

module.exports = function renderFile(files, filename, metadata, source, options) {
  const [base, ...extensions] = filename.split('.')
  const file = files[filename]

  if (!isUtf8(file.contents)) {
    return filename
  }

  // Stringify file contents
  file.contents = file.contents.toString()

  // Loop through all extensions
  for (let i = 0; i < extensions.length; i += 1) {
    // Get last extension and the appropriate transformer
    const extension = extensions.pop()
    const transform = getTransformer(extension)

    // If the current extension can't be transformed stop looping
    if (!transform) {
      extensions.push(extension)
      break
    }

    // Otherwise transform the contents
    const locals = extend({}, metadata, file)
    file.contents = transform.render(file.contents, options, locals).body

    // If the last extension was transformed, replace it with a new one
    if (extensions.length === 0) {
      extensions[0] = transform.outputFormat
    }
  }

  // Convert file contents back to buffer
  file.contents = new Buffer(file.contents)

  // Add base filename back to the beginning of the extensions array
  extensions.unshift(base)

  // Return updated filename
  return extensions.join('.')
}
