'use strict';
var LIVERELOAD_PORT = 35729;
var PORT = 9004;
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    // require('time-grunt')(grunt);
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
            all: {
                options: {
                    data: ['src/data/*.{json,yml}']
                },
                files: {
                    '<%%= main.dist %>/': ['src/templates/pages/*.hbs']
                },
            },
        },

        clean: {
            f_static_site: ["<%%= main.dist %>/*"],
            typo3_ext: ["<%%= main.repo %>/typo3conf/ext"],
            foundation: ["foundation/typo3conf/ext/**/*"],
            bower_pack_from_typo3_ext: ['<%%= main.repo %>/typo3conf/ext/pxa_bootstrap','<%%= main.repo %>/typo3conf/ext/pxa_fluidcontent','<%%= main.repo %>/typo3conf/ext/pxa_foundation','<%%= main.repo %>/typo3conf/ext/pxa_foundation_layout'],
            temp_ext: ["temp/pxa_ext/*"],
            typo3_bootstrap: ["<%%= main.repo %>/typo3conf/ext/bootstrap", "<%%= main.repo %>/typo3conf/ext/jquery"]

        },

        mkdir: {
            all: {
                options: {
                  create: ['<%%= main.dist %>/assets']
                },
            },
        },


        copy: {
            bower_to_ext: {
              files: [
              {expand: true, cwd: 'bower_components/', src: ['**'], dest: '<%%= main.repo %>/typo3conf/ext'}
              ]
            },
            bootstrap_to_ext: {
              files: [
              {expand: true, cwd: 'bower_components/bootstrap', src: ['**'], dest: '<%%= main.repo %>/typo3conf/ext/pxa_foundation/Resources/Public/Contrib/bootstrap/'}
              ]
            },
            bower_to_foundation: {
              files: [
              {expand: true, cwd: 'bower_components/', src: ['**'], dest: 'foundation/typo3conf/ext'}
              ]
            },
            bootstrap_to_foundation: {
              files: [
              {expand: true, cwd: 'bower_components/bootstrap', src: ['**'], dest: 'foundation/typo3conf/ext/pxa_foundation/Resources/Public/Contrib/bootstrap/'}
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
            ext_file_to_temp: {
              files: [
              {expand: true, cwd: '<%%= main.repo %>/typo3conf/', src: ['ext'], dest: 'temp/pxa_ext/'}
              ]
            },
            ext_file_from_temp: {
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
            ext_folder_to_temp: {
              files: [
              {expand: true, cwd: '<%%= main.repo %>/typo3conf/ext/', src: ['pxa_bootstrap/**', 'pxa_fluidcontent/**', 'pxa_foundation/**', 'pxa_foundation_layout/**'], dest: 'temp/pxa_ext/'}
              ]
            },
            ext_folder_from_temp: {
              files: [
              {expand: true, cwd: 'temp/pxa_ext/', src: ['**'], dest: '<%%= main.repo %>/typo3conf/ext/'}
              ]
            }



        },

    });

        grunt.loadNpmTasks('assemble');

        grunt.registerTask('start_part-one', [
        'clean:f_static_site',
        'mkdir',
        'copy:styles',
        'copy:styles_fix',
        'copy:bower_to_foundation',
        'copy:bootstrap_to_foundation',
        'copy:ext_folder_to_temp',
        'clean:bower_pack_from_typo3_ext',
        'copy:bower_to_ext',
        'copy:bootstrap_to_ext',
        'copy:font',
        'copy:img',
        'less:dev',
        'assemble',
        'connect:livereload'
        ]);
        grunt.registerTask('start_part-two', function(){
            grunt.log.writeln('').writeln('Press  ( CTRL + C ) to stop watch process'['magenta']);
            grunt.task.run(["watch"]);
        });
        grunt.registerTask('end', [
        'clean:bower_pack_from_typo3_ext',
        'clean:typo3_bootstrap',
        'copy:ext_folder_from_temp',
        'clean:temp_ext',
        'clean:foundation'
        ]);
        grunt.registerTask('commit', function(){
        grunt.log.writeln('').writeln('Now you can commit your changes, write (.\/commit) in Terminal(MAC), or (commit) in Terminal(Windows) ' ['magenta']);
        });


grunt.registerTask("start",function(){
      grunt.task.run(['start_part-one']);
      grunt.task.run(['start_part-two']);
      process.on("SIGINT",function(){
        grunt.task.run(['end']);
        grunt.task.run(['commit']);
        grunt.task.current.async()();
    });
});

    grunt.registerTask('shared_start_part-one', [
        'clean:f_static_site',
        'mkdir',
        'copy:styles',
        'copy:styles_fix',
        'copy:ext_file_to_temp',
        'clean:typo3_ext',
        'copy:bower_to_ext',
        'copy:bootstrap_to_ext',
        'copy:font',
        'copy:img',
        'less:dev',
        'assemble',
        'connect:livereload'
    ]);
    grunt.registerTask('shared_start_part-two', function(){
        grunt.log.writeln('').writeln('Press ( CTRL + C ) to stop watch process'['magenta']);
        grunt.task.run(["watch"]);
    });
    grunt.registerTask('shared_end', [
        'clean:typo3_ext',
        'copy:ext_file_from_temp',
        'clean:temp_ext'
    ]);
    grunt.registerTask('commit', function(){
        grunt.log.writeln('').writeln('Now you can commit your changes, write (.\/commit) in Terminal(MAC), or (commit) in Terminal(Windows) ' ['magenta']);
    });

grunt.registerTask("shared_start",function(){
      grunt.task.run(['shared_start_part-one']);
      grunt.task.run(['shared_start_part-two']);
      process.on("SIGINT",function(){
        grunt.task.run(['shared_end']);
        grunt.task.run(['commit']);
        grunt.task.current.async()();
    });
});

};
