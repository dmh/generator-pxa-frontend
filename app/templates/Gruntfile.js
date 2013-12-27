'use strict';
var LIVERELOAD_PORT = 35729;
var PORT = 9004;
// var tempp;

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    var fs = require('fs');
    var mainn = {
        dist: 'foundation_static_site',
        repo: '<%= (dirr) %>',
        gitLink: '<%= (gitt) %>',
        repoExt: '<%= (dirr) %>/typo3conf',
        ifShared: '<%= (shared) %>'
    };

    grunt.initConfig({
        main: mainn,
        fonVerObj: function () {
            if (mainn.ifShared === 'true') {
                return fs.readlinkSync(mainn.repo + '/' + 'foundationDir').slice(3);
            } else {
                return 'foundation';
            }
        },
        watch: {
            html: {
                files: ['src/**/*.hbs'],
                tasks: ['assemble']
            },
            less: {
                files: '<%%= main.repo %>/fileadmin/Pixelant/css/{,*/}*.less',
                tasks: ['less:dev']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: 'jshint'
            },
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
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
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
                    '<%%= main.dist %>/assets/styles.css': ['<%%= main.repo %>/fileadmin/Pixelant/css/root.less']
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
            fStaticSite: ['<%%= main.dist %>/*'],
            typo3Ext: ['<%%= main.repo %>/typo3conf/ext'],
            foundation: ['<%%= fonVerObj() %>'],
            bowerPackFromTypo3Ext: ['<%%= main.repo %>/typo3conf/ext/pxa_bootstrap', '<%%= main.repo %>/typo3conf/ext/pxa_fluidcontent', '<%%= main.repo %>/typo3conf/ext/pxa_foundation', '<%%= main.repo %>/typo3conf/ext/pxa_foundation_layout'],
            tempExt: ['temp/pxa_ext/*'],
            typo3Bootstrap: ['<%%= main.repo %>/typo3conf/ext/bootstrap', '<%%= main.repo %>/typo3conf/ext/jquery']
        },

        mkdir: {
            all: {
                options: {
                    create: ['<%%= main.dist %>/assets']
                },
            },
            fonDir: {
                options: {
                    create: ['<%%= fonVerObj() %>/typo3conf/ext']
                },
            },
        },

        shell: {
            gitClone: {
                options: {
                    stdout: true
                },
                command: 'if [ ! -d <%%= main.repo %> ]; then git clone <%%= main.gitLink %> ; fi'
            },
        },

        copy: {
            bowerToExt: {
                files: [
                    {expand: true, cwd: 'bower_components/', src: ['**'], dest: '<%%= main.repo %>/typo3conf/ext'}
                ]
            },
            bootstrapToExt: {
                files: [
                    {expand: true, cwd: 'bower_components/bootstrap', src: ['**'], dest: '<%%= main.repo %>/typo3conf/ext/pxa_foundation/Resources/Public/Contrib/bootstrap/'}
                ]
            },
            bowerToFoundation: {
                files: [
                    {expand: true, cwd: 'bower_components/', src: ['**'], dest: '<%%= fonVerObj() %>/typo3conf/ext'}
                ]
            },
            bootstrapToFoundation: {
                files: [
                    {expand: true, cwd: 'bower_components/bootstrap', src: ['**'], dest: '<%%= fonVerObj() %>/typo3conf/ext/pxa_foundation/Resources/Public/Contrib/bootstrap/'}
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
            extFileToTemp: {
                files: [
                    {expand: true, cwd: '<%%= main.repo %>/typo3conf/', src: ['ext'], dest: 'temp/pxa_ext/'}
                ]
            },
            extFileFromTemp: {
                files: [
                    {expand: true, cwd: 'temp/pxa_ext/', src: ['ext'], dest: '<%%= main.repo %>/typo3conf/'}
                ]
            },
            styles: {
                files: [
                    {expand: true, src: ['styles.css'], dest: '<%%= main.dist %>/assets'}
                ]
            },
            stylesFix: {
                files: [
                    {expand: true, src: ['fix.css'], dest: '<%%= main.dist %>/assets'}
                ]
            },
            extFolderToTemp: {
                files: [
                    {expand: true, cwd: '<%%= main.repo %>/typo3conf/ext/', src: ['pxa_bootstrap/**', 'pxa_fluidcontent/**', 'pxa_foundation/**', 'pxa_foundation_layout/**'], dest: 'temp/pxa_ext/'}
                ]
            },
            extFolderFromTemp: {
                files: [
                    {expand: true, cwd: 'temp/pxa_ext/', src: ['**'], dest: '<%%= main.repo %>/typo3conf/ext/'}
                ]
            }
        },
    });

    grunt.loadNpmTasks('assemble');

    grunt.registerTask('start_part-one', [
        'clean:fStaticSite',
        'mkdir',
        'copy:styles',
        'copy:stylesFix',
        'copy:bowerToFoundation',
        'copy:bootstrapToFoundation',
        'copy:extFolderToTemp',
        'clean:bowerPackFromTypo3Ext',
        'copy:bowerToExt',
        'copy:bootstrapToExt',
        'copy:font',
        'copy:img',
        'less:dev',
        'assemble',
        'connect:livereload'
    ]);

    grunt.registerTask('start', function () {
        grunt.task.run(['start_part-one']);
        grunt.task.run(['watch_task']);
    });

    grunt.registerTask('end', [
        'clean:bowerPackFromTypo3Ext',
        'clean:typo3Bootstrap',
        'copy:extFolderFromTemp',
        'clean:tempExt',
        'clean:foundation'
    ]);

    grunt.registerTask('shared_start_part-one', [
        'clean:fStaticSite',
        'mkdir',
        'copy:styles',
        'copy:stylesFix',
        'copy:extFileToTemp',
        'clean:typo3Ext',
        'copy:bowerToExt',
        'copy:bootstrapToExt',
        'copy:font',
        'copy:img',
        'less:dev',
        'assemble',
        'connect:livereload'
    ]);

    grunt.registerTask('shared_start', function () {
        grunt.task.run(['shared_start_part-one']);
        grunt.task.run(['watch_task']);
    });

    grunt.registerTask('shared_end', [
        'clean:typo3Ext',
        'copy:extFileFromTemp',
        'clean:tempExt'
    ]);

    grunt.registerTask('commit', function () {
        grunt.log.writeln('').writeln('-------------------------------------------------------'.magenta).writeln('Now you can commit your changes'.magenta).writeln('Enter ( ./commit ) in Terminal(MAC), or ( commit ) in Terminal(Windows)'.magenta).writeln('-------------------------------------------------------'.magenta).writeln('').writeln('Also you can check your pxa modules using command:'.cyan).writeln(' • (./pxa-list ) Mac'.cyan).writeln(' • ( pxa-list ) Windows'.cyan).writeln(' • Or enter ( bower list ) everywhere'.cyan).writeln('To update pxa modules enter:'.cyan).writeln(' • ( ./update ) Mac'.cyan).writeln(' • ( update ) Windows'.cyan).writeln('-------------------------------------------------------'.cyan);
    });

    grunt.registerTask('watch_task', function () {
        grunt.log.writeln('').writeln('Press  (CTRL + C) to stop watch process'.magenta);
        grunt.task.run(['watch']);
    });

    grunt.registerTask('go', function () {
        grunt.task.run(['shell:gitClone']);
        grunt.task.run(['mkdir:fonDir']);
        grunt.task.run(['start']);
        process.on('SIGINT', function () {
            grunt.task.run(['end']);
            grunt.task.run(['commit']);
            grunt.task.current.async()();
        });
    });

};

