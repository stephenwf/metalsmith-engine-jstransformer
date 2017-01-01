# metalsmith-engine-jstransformer

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
[slack-url]: http://metalsmith-slack.herokuapp.com/
[stackoverflow-url]: http://stackoverflow.com/questions/tagged/metalsmith
[jstransformer-url]: https://github.com/jstransformers/jstransformer
[jstransformer-handlebars-url]: https://github.com/jstransformers/jstransformer-handlebars
