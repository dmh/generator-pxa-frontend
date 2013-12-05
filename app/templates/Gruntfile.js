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
                files: '<%%= main.repo %>/fileadmin/Pixelant/css/*.less',
                tasks: ['less']
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

// connect: {
//             options: {
//                 port: 9000,
//                 // change this to '0.0.0.0' to access the server from outside
//                 hostname: '0.0.0.0'
//             },
//             livereload: {
//                 options: {
//                     middleware: function (connect) {
//                         return [
//                             lrSnippet,
//                             mountFolder(connect, 'foundation_static_site')
//                         ];
//                     }
//                 }
//             },
//         },

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
          development: {
            files: {
              "<%%= main.dist %>/assets/styles.css": "<%%= main.repo %>/fileadmin/Pixelant/css/root.less"
            }
          },
        },


        // assemble: {
        //   options: {
        //     assets: 'assets',
        //     partials: ['includes/**/*.hbs'],
        //     layout: ['layouts/default.hbs'],
        //     data: ['data/*.{json,yml}']
        //   },
        //   pages: {
        //     src: ['docs/*.hbs'],
        //     dest: './'
        //   }
        // },

        // assemble: {
        //       options: {
        //         flatten: true,
        //         layout: 'layout.hbs',
        //         layoutdir: 'src/templates/layouts',
        //         assets: 'foundation_static_site/assets',
        //         partials: ['src/templates/pages/*.hbs', 'src/templates/parts/*.hbs']
        //       },
        //       demo: {
        //         options: {
        //           data: ['src/data/*.{json,yml}']
        //         },
        //         files: {
        //           'foundation_static_site/': ['src/templates/pages/*.hbs']
        //         }
        //       }
        //     },



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
            delete_ext_temp: ["temp/pxa_ext/*"]
            // pxa_ext: ["ems-ekonomi/typo3conf/pxa_bootstrap", "ems-ekonomi/typo3conf/pxa_fluidcontent", "ems-ekonomi/typo3conf/foundation_layout"]
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


        }

    });
grunt.loadNpmTasks('assemble');
    grunt.registerTask('start', [
        'clean:static_site',
        'mkdir',
        'copy:styles',
        'copy:ext',
        'clean:pxa_ext_delete',
        'copy:bower',
        'copy:boot',
        'less',
        'assemble',
        'connect:livereload',
        'watch',
        'watch'
    ]);
    grunt.registerTask('end', [
        'clean:pxa_ext_delete',
        'copy:ext_return',
        'clean:delete_ext_temp'
    ]);

};
