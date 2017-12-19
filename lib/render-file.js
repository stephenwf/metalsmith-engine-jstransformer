/**
 * Dependencies
 */

const extend = require('extend')
const path = require('path')
const utf8 = require('is-utf8')

/**
 * Local
 */

const getTransformer = require('./get-transformer')

/**
 * Renders file with all available transformers
 */

module.exports = function renderFile(files, filename, metadata, source, options) {
  // Split filename and extensions
  const parts = filename.split('.')
  const name = parts.shift()
  const file = files[filename]
  if (!utf8(file.contents)) return filename

  // Set filename in options, necessary for some languages
  // eslint-disable-next-line no-param-reassign
  options.filename = path.join(source, filename)

  // Stringify file contents
  file.contents = file.contents.toString()

  // Loop through all extensions
  for (let i = 0; i < parts.length; i += 1) {
    // Get last extension and the appropriate transformer
    const extension = parts.pop()
    const transform = getTransformer(extension, options.customTrasnformer)

    // If the current extension can't be transformed stop looping
    if (!transform) {
      parts.push(extension)
      break
    }

    // Otherwise transform the contents
    const locals = extend({}, metadata, file)
    file.contents = transform.render(file.contents, options, locals).body

    // If the last extension was transformed, replace it with a new one
    if (parts.length === 0) {
      parts[0] = transform.outputFormat
    }
  }

  // Convert file contents back to buffer
  file.contents = new Buffer(file.contents)

  // Add name back to the beginning of the extensions array
  parts.unshift(name)

  // Return updated filename
  return parts.join('.')
}
