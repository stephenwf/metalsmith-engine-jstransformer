const plugin = (options = {}) => {
  const Engine = options.engine
  const engineOptions = options.engineOptions || {}

  return (files, metalsmith, done) => {
    const engine = new Engine(files, metalsmith, engineOptions)

    // Filter files by validity
    const validFiles = Object.keys(files).filter(filename => engine.validate(filename))

    // Map all files that should be processed to an array of promises
    const promises = validFiles.map(filename => engine.render(filename))

    // Call done callback when all promises are resolved
    Promise.all(promises).then(() => done()).catch(error => done(error))
  }
}

module.exports = plugin
