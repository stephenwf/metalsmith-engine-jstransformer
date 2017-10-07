/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */

const Metalsmith = require('metalsmith')
const equal = require('assert-dir-equal')
const plugin = require('metalsmith-in-place')
const rimraf = require('rimraf')
const path = require('path')
const engine = require('./index')

describe('metalsmith-engine-jstransformer', () => {
  it('should transform matching files correctly', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'transform')
    const actual = path.join(base, 'build')
    const expected = path.join(base, 'expected')
    const metalsmith = new Metalsmith(base)

    rimraf.sync(actual)

    return metalsmith.use(plugin({ engine })).build(err => {
      if (err) {
        return done(err)
      }
      expect(() => equal(actual, expected)).not.toThrow()
      return done()
    })
  })

  it('should ignore files without an extension', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'ignore-extensionless')
    const actual = path.join(base, 'build')
    const expected = path.join(base, 'expected')
    const metalsmith = new Metalsmith(base)

    rimraf.sync(actual)

    return metalsmith.use(plugin({ engine })).build(err => {
      if (err) {
        return done(err)
      }
      expect(() => equal(actual, expected)).not.toThrow()
      return done()
    })
  })

  it('should transform files with multiple matching extensions correctly', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'transform-multiple')
    const actual = path.join(base, 'build')
    const expected = path.join(base, 'expected')
    const metalsmith = new Metalsmith(base)

    rimraf.sync(actual)

    return metalsmith.use(plugin({ engine })).build(err => {
      if (err) {
        return done(err)
      }
      expect(() => equal(actual, expected)).not.toThrow()
      return done()
    })
  })

  it('should transform files with multiple matching extensions (including the first extension) correctly', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'transform-multiple-and-first')
    const actual = path.join(base, 'build')
    const expected = path.join(base, 'expected')
    const metalsmith = new Metalsmith(base)

    rimraf.sync(actual)

    return metalsmith.use(plugin({ engine })).build(err => {
      if (err) {
        return done(err)
      }
      expect(() => equal(actual, expected)).not.toThrow()
      return done()
    })
  })

  it('should not transform files that do not have a matching transformer', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'not-transform')
    const actual = path.join(base, 'build')
    const expected = path.join(base, 'expected')
    const metalsmith = new Metalsmith(base)

    rimraf.sync(actual)

    return metalsmith.use(plugin({ engine })).build(err => {
      if (err) {
        return done(err)
      }
      expect(() => equal(actual, expected)).not.toThrow()
      return done()
    })
  })

  it('should ignore binary files', done => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'ignore-binary')
    const actual = path.join(base, 'build')
    const expected = path.join(base, 'expected')
    const metalsmith = new Metalsmith(base)

    rimraf.sync(actual)

    return metalsmith.use(plugin({ engine })).build(err => {
      if (err) {
        return done(err)
      }
      expect(() => equal(actual, expected)).not.toThrow()
      return done()
    })
  })
})
