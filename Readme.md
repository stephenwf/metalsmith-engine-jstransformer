# metalsmith-engine-jstransformer

> A jstransformer engine for metalsmith-in-place and metalsmith-layouts

This engine allows you to render templates with 
[jstransformer](https://github.com/jstransformers/jstransformer). Files will be transformed based on
their extension, last extension first. Transformations are applied until there are no more 
applicable jstransformers left.

Though its main purpose is rendering templates, any jstransformer compatible plugin can be used. For
support questions please use [stack overflow][stackoverflow-url] or our [slack channel][slack-url].

## Example

Install [jstransformer-handlebars](https://github.com/jstransformers/jstransformer-handlebars) to 
enable the handlebars transformation:

```
$ npm install jstransformer-handlebars
```

Since we're using jstransformer, and jstransformer is the default engine for metalsmith-in-place, we
don't have to install `metalsmith-engine-jstransformer` separately. We also don't have to specify it
in the configuration below. The only thing we have to specify is that we want to use
`metalsmith-in-place`. `metalsmith-engine-jstransformer` will then detect which jstransformers you 
have installed, and apply them when it encounters files with a matching extension. See
[here](https://github.com/jstransformers/inputformat-to-jstransformer/blob/master/dictionary.json)
for a list of extensions and the jstransformers they belong to.

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
want to use. See [metalsmith-in-place](https://github.com/jstransformers/jstransformer-handlebars)
for instructions on how to pass options to jstransformer.

[slack-url]: http://metalsmith-slack.herokuapp.com/
[stackoverflow-url]: http://stackoverflow.com/questions/tagged/metalsmith
