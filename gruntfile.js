module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      allFiles: ['Gruntfile.js', 'app.js', 'public/js/**/*.js', 'tests/**/*.js', 'config/**/*.js']
    },
    protractor: {
      options: {
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: false // If true, protractor will not use colors in its output.
      },
      target: {
        configFile: "config/spec-e2e.js"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-protractor-runner');
  
  grunt.registerTask('test', function() {

    var selenium = grunt.util.spawn({
      cmd: 'webdriver-manager',
      args: ['start']
    });
    process.on('exit', function () {
      selenium.kill();
    });

    var node = grunt.util.spawn({
      cmd: 'node',
      args: ['app.js']
    });
    process.on('exit', function () {
      node.kill();
    });

    grunt.task.run('protractor');

  });

  grunt.registerTask('default', ['jshint', 'test']);

};