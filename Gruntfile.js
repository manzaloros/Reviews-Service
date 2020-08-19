const webpackConfig = require('./webpack.config.js');
const grunt = require('grunt');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    aws: grunt.file.readJSON('aws-keys.json'),
    pkg: grunt.file.readJSON('package.json'),
    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.AWSSecretKey %>',
        bucket: '<%= aws.bucket %>'
      },
      dev: {
        files: [{
          src: 'dist/bundle.js',
          dest: 'documents/bundle.js'
        }]
      }
    },
    webpack: {
      build: Object.assign({mode: 'development'}, webpackConfig),
      produce: Object.assign({mode: 'production', stats: 'minimal'}, webpackConfig)
    }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.registerTask('default', ['webpack:build']);
  grunt.registerTask('deploy', ['webpack:produce', 'aws_s3']);
};
