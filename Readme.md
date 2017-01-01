# metalsmith-engine-jstransformer

[![npm version][version-badge]][version-url]
[![downloads][downloads-badge]][downloads-url]
[![slack chat][slack-badge]][slack-url]

> A jstransformer engine for metalsmith-in-place and metalsmith-layouts

This engine allows you to render templates with [jstransformer][jstransformer-url]. Files will be
transformed based on their extension, last extension first. Transformations are applied until there
are no more applicable jstransformers left.

Though its main purpose is rendering templates, any jstransformer compatible plugin can be used. For
support questions please use [stack overflow][stackoverflow-url] or our [slack channel][slack-url].

## Example

For example, install [jstransformer-handlebars][jstransformer-handlebars-url] to enable the
handlebars transformation:

```
$ npm install jstransformer-handlebars
```

`metalsmith-engine-jstransformer` will detect which transformers you have installed and apply them.
Use the following build configuration:

```javascript
var metalsmith = require('metalsmith')
var inPlace = require('metalsmith-in-place')

metalsmith(__dirname)
  .use(inPlace())
  .build(function(err){
    if (err) throw err;
  });
```

Source file `src/index.html.hbs`:

```html
---
title: The title
---
<p>{{title}}</p>
```

Results in `build/index.html`:

```html
<p>The title</p>
```

This is a simple example, but of course you can expand on this and use any jstransformers that you
want to use. See [metalsmith-in-place](in-place-url) for instructions on how to pass options to
jstransformer and see [here](dictionary-url) to see which extensions match to which jstransformers.

## License

MIT

[in-place-url]: https://github.com/superwolff/metalsmith-in-place
[dictionary-url]: https://github.com/jstransformers/inputformat-to-jstransformer/blob/master/dictionary.json
[stackoverflow-url]: http://stackoverflow.com/questions/tagged/metalsmith
[jstransformer-url]: https://github.com/jstransformers/jstransformer
[jstransformer-handlebars-url]: https://github.com/jstransformers/jstransformer-handlebars

[downloads-badge]: https://img.shields.io/npm/dm/metalsmith-engine-jstransformer.svg
[downloads-url]: https://www.npmjs.com/package/metalsmith-engine-jstransformer
[slack-badge]: https://img.shields.io/badge/Slack-Join%20Chat%20→-blue.svg
[slack-url]: http://metalsmith-slack.herokuapp.com/
[version-badge]: https://img.shields.io/npm/v/metalsmith-engine-jstransformer.svg
[version-url]: https://www.npmjs.com/package/metalsmith-engine-jstransformer
[stackoverflow-url]: http://stackoverflow.com/questions/tagged/metalsmith
