# grunt-dataurijs

> Transform resources in js values

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dataurijs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dataurijs');
```

## The "dataurijs" task

### Overview
In your project's Gruntfile, add a section named `dataurijs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  dataurijs: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.itemFormat
Type: `String`
Default value: `'var %s = "%s";'`

A string value that provides the format to render for each file's base64 content.
First replace token is the identifier given by options.itemVariableFormat.
Second replace token is the file's base64 content.

#### options.itemVariableFormat
Type: `Function`
Default value: `function(item){
                          return path.basename(item, path.extname(item)).replace(/[^a-z0-9]/ig, "_");
                      }`

A function that gives a unique name to each file's base64 content.

#### options.fileHeader
Type: `String`
Default value: `''`

A text that is used as file header.

#### options.fileFooter
Type: `String`
Default value: `''`

A text that is used as file footer.

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  dataurijs: {
    options: {},
    files: {
      'dest/default_options': ['test/fixtures/testing.txt', 'test/fixtures/image.png', 'test/fixtures/sounds/test.mp3'],
    },
  },
});
```

#### Custom Options

```js
grunt.initConfig({
  dataurijs: {
    options: {
      itemFormat: '"%s" : "%s",',
      fileHeader: 'angular.module("testModule").factory([function(){return {',
      fileFooter: '"_":null};}]);'
    },
    files: {
      'dest/custom_options': ['test/fixtures/testing.txt', 'test/fixtures/image.png', 'test/fixtures/sounds/test.mp3'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.2 - can set destination as a directory, then each file produces its file
0.1.1 - better source files and wildcards support
0.1.0 - initial release
