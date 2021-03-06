'use strict';
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
            },
            all: [
                'Gruntfile.js',
                'app/templates/Gruntfile.js',
                'app/index.js'
            ]
        }
    });
};
