'use strict';

/**
 * Dependencies
 */

var extend = require('extend');
var path = require('path');

/**
 * Local
 */

var getTransformer = require('./get-transformer');

/**
 * Renders file with all available transformers
 */

module.exports = function renderFile(files, filename, metadata, source, options) {
  // Split filename and extensions
  var parts = filename.split('.');
  var name = parts.shift();
  var file = files[filename];

  // Set filename in options, necessary for some languages
  options.filename = path.join(source, filename);

  // Stringify file contents
  file.contents = file.contents.toString();

  // Loop through all extensions
  for (var i = 0; i < parts.length; i++) {
    // Get last extension and the appropriate transformer
    var extension = parts.pop();
    var transform = getTransformer(extension);

    // If the current extension can't be transformed stop looping
    if (!transform) {
      parts.push(extension);
      break;
    }

    // Otherwise transform the contents
    var locals = extend({}, metadata, file);
    file.contents = transform.render(file.contents, options, locals).body;

    // If the last extension was transformed, replace it with a new one
    if (parts.length === 0) {
      parts[0] = transform.outputFormat;
    }
  }

  // Convert file contents back to buffer
  file.contents = new Buffer(file.contents);

  // Add name back to the beginning of the extensions array
  parts.unshift(name);

  // Return updated filename
  return parts.join('.');
};