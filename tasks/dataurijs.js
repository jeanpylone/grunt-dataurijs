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
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
          if (grunt.file.isDir(filepath)) {
              return null;
          }
          var dUri    = new Datauri(filepath);
          return {
              id: options.itemVariableFormat(filepath),
              content: util.format(options.itemFormat, options.itemVariableFormat(filepath), dUri.content)
          };
      })
          .filter(function(item){return !!item;});

        if (grunt.file.isDir(f.dest)){
            src.forEach(function(s){
                grunt.log.writeln(f.dest + ' ' + s.id);
                var file = path.join(f.dest, s.id +".js");
                grunt.file.write(file, options.fileHeader + s.content + options.fileFooter);
                grunt.log.writeln('File "' + f.dest + '" created.');
            });
        }
        else {
            grunt.file.write(f.dest, options.fileHeader + src.map(function(item){return item.content;}).join(grunt.util.normalizelf('\n')) + options.fileFooter);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        }
    });
  });
};
