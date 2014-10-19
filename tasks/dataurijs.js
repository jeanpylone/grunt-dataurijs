/*
 * grunt-dataurijs
 * https://github.com/jeanpylone/grunt-dataurijs
 *
 * Copyright (c) 2014 Jean-Philippe Schneider
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function(grunt) {

  var Datauri = require('datauri'),
      path = require('path'),
      util = require('util');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('dataurijs', 'Transform resources in js values', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      itemFormat: 'var %s = "%s";',
      itemVariableFormat: function(item){
          return path.basename(item, path.extname(item)).replace(/[^a-z0-9]/ig, "_");
      },
      fileHeader: '',
      fileFooter: ''
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = options.fileHeader + f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
          var dUri    = new Datauri(filepath);
          return util.format(options.itemFormat, options.itemVariableFormat(filepath), dUri.content);
      }).join(grunt.util.normalizelf('\n')) + options.fileFooter;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
