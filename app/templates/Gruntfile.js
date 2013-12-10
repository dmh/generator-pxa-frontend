'use strict';
var LIVERELOAD_PORT = 35729;
var PORT = 9004;
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    var mainn = {
        dist: 'foundation_static_site',
        repo: '<%= (dirr) %>'
    };

    grunt.initConfig({
        main: mainn,
        watch: {
            html: {
                files: ['src/**/*.hbs'],
                tasks: ['assemble']
            },
            less: {
                files: '<%%= main.repo %>/fileadmin/Pixelant/css/{,*/}*.less',
                tasks: ['less:dev']
            },
            // gruntfile: {
            //     files: ['Gruntfile.js'],
            //     tasks: 'jshint'
            // },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%%= main.dist %>/*.html',
                    '<%%= main.dist %>/assets/{,*/}*.css'
                ]
            }
        },

        connect: {
            options: {
                port: PORT,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
                // hostname: 'localhost'
            },
            livereload: {
                options: {
                    // livereload: true,
                    base: '<%%= main.dist %>',
                    open: 'http://localhost:' + PORT
                },
            },
        },



        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js'
            ]
        },

        less: {
          dev: {
            files: {
              "<%%= main.dist %>/assets/styles.css": ["<%%= main.repo %>/fileadmin/Pixelant/css/root.less"]
            }
          },
        },


        assemble: {
            options: {
                flatten: true,
                layout: 'layout.hbs',
                layoutdir: 'src/templates/layouts',
                assets: '<%%= main.dist %>/assets',
                partials: ['src/templates/pages/*.hbs', 'src/templates/parts/*.hbs']
            },
            demo: {
                options: {
                    data: ['src/data/*.{json,yml}']
                },
                files: {
                    '<%%= main.dist %>/': ['src/templates/pages/*.hbs']
                },
            },
        },

        clean: {
            static_site: ["<%%= main.dist %>/*"],
            pxa_ext_delete: ["<%%= main.repo %>/typo3conf/ext"],
            f_pxa_ext_delete: ['<%%= main.repo %>/typo3conf/ext/pxa_bootstrap','<%%= main.repo %>/typo3conf/ext/pxa_fluidcontent','<%%= main.repo %>/typo3conf/ext/pxa_foundation','<%%= main.repo %>/typo3conf/ext/pxa_foundation_layout'],
            delete_ext_temp: ["temp/pxa_ext/*"],
            delete_boot: ["<%%= main.repo %>/typo3conf/ext/bootstrap", "<%%= main.repo %>/typo3conf/ext/jquery"]

        },

        mkdir: {
            all: {
                options: {
                  create: ['<%%= main.dist %>/assets']
                },
            },
        },


        copy: {
            bower: {
              files: [
              {expand: true, cwd: 'bower_components/', src: ['**'], dest: '<%%= main.repo %>/typo3conf/ext'}
              ]
            },
            boot: {
              files: [
              {expand: true, cwd: 'bower_components/bootstrap', src: ['**'], dest: '<%%= main.repo %>/typo3conf/ext/pxa_foundation/Resources/Public/Contrib/bootstrap/'}
              ]
            },
            font: {
              files: [
              {expand: true, cwd: '<%%= main.repo %>/typo3conf/ext/pxa_foundation/Resources/Public/', src: ['font/**'], dest: '<%%= main.dist %>'}
              ]
            },
            img: {
              files: [
              {expand: true, cwd: '<%%= main.repo %>/typo3conf/ext/pxa_foundation_layout/Resources/Public/', src: ['img/**'], dest: '<%%= main.dist %>'}
              ]
            },
            ext: {
              files: [
              {expand: true, cwd: '<%%= main.repo %>/typo3conf/', src: ['ext'], dest: 'temp/pxa_ext/'}
              ]
            },
            ext_return: {
              files: [
              {expand: true, cwd: 'temp/pxa_ext/', src: ['ext'], dest: '<%%= main.repo %>/typo3conf/'}
              ]
            },
            styles: {
              files: [
              {expand: true, src: ['styles.css'], dest: '<%%= main.dist %>/assets'}
              ]
            },
            styles_fix: {
              files: [
              {expand: true, src: ['fix.css'], dest: '<%%= main.dist %>/assets'}
              ]
            },
            ext_folder_copy: {
              files: [
              {expand: true, cwd: '<%%= main.repo %>/typo3conf/ext/', src: ['pxa_bootstrap/**', 'pxa_fluidcontent/**', 'pxa_foundation/**', 'pxa_foundation_layout/**'], dest: 'temp/pxa_ext/'}
              ]
            },
            ext_folder_return: {
              files: [
              {expand: true, cwd: 'temp/pxa_ext/', src: ['**'], dest: '<%%= main.repo %>/typo3conf/ext/'}
              ]
            }



        },

    });
grunt.loadNpmTasks('assemble');
    grunt.registerTask('start', [
        'clean:static_site',
        'mkdir',
        'copy:styles',
        'copy:styles_fix',
        'copy:ext',
        'clean:pxa_ext_delete',
        'copy:bower',
        'copy:boot',
        'copy:font',
        'copy:img',
        'less:dev',
        'assemble',
        'connect:livereload',
        'watch'
    ]);
    grunt.registerTask('end', [
        'clean:pxa_ext_delete',
        'copy:ext_return',
        'clean:delete_ext_temp'
    ]);
    grunt.registerTask('f_start', [
        'clean:static_site',
        'mkdir',
        'copy:styles',
        'copy:styles_fix',
        'copy:ext_folder_copy',
        'clean:f_pxa_ext_delete',
        'copy:bower',
        'copy:boot',
        'copy:font',
        'copy:img',
        'less:dev',
        'assemble',
        'connect:livereload',
        'watch'
    ]);
    grunt.registerTask('f_end', [
        'clean:f_pxa_ext_delete',
        'copy:ext_folder_return',
        'clean:delete_ext_temp',
        'clean:delete_boot'
    ]);

};
