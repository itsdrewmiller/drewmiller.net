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

    grunt.util.spawn({
      cmd: 'webdriver-manager',
      args: ['start']
    });

    grunt.util.spawn({
      cmd: 'node',
      args: ['app.js']
    });

    grunt.task.run('protractor');

  });

  grunt.registerTask('default', ['jshint', 'test']);

};