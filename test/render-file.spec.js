const assert = require('assert');
const renderFile = require('../lib/render-file');

describe('render-file', () => {
  it('does not corrupt binary data', () => {
    const binaryBuffer = new Buffer('042697a30b2dafbdf91bf66bdacdcba8', 'hex');

    const files = { foo: { contents: binaryBuffer } };
    const metadata = {};
    const source = '/src';
    const options = {};

    renderFile(files, 'foo', metadata, source, options);
    assert(files.foo.contents === binaryBuffer,
      'Buffer must be the same after untransformed processing');
  });
});

