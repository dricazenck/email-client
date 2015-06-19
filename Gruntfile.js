module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['Gruntfile.js', 'src/app/**/*.js', 'test/spec/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: false,
                },
                files: {
                    "./src/assets/css/email-client.css": "./src/assets/less/main.less"
                }
            },
            prod: {
                options: {
                    compress: true,
                },
                files: {
                    "./src/assets/css/email-client.<%= pkg.version %>.min.css": "./src/assets/less/main.less"
                }
            }
        },
        concat: {
            vendor: {
                src: [
                    './bower_components/jquery/dist/jquery.js'
                ],
                dest: './src/assets/js/vendors.js',
            },
            js: {
                src: [
                    'src/app/**/*.js'
                ],
                dest: './src/assets/js/email-client.js',
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            frontend: {
                files: {
                    './src/assets/js/email-client.<%= pkg.version %>.min.js': './src/assets/js/email-client.js',
                }
            },
            vendor: {
                files: {
                    './src/assets/js/vendors.<%= pkg.version %>.min.js': './src/assets/js/vendors.js',
                }
            }
        },
        replace: {
            prod: {
                src: ['./src/index.html'],
                dest: './src/index.html',
                replacements: [{
                    from: 'vendors.js',
                    to: 'vendors.<%= pkg.version %>.min.js'
                }, {
                    from: 'email-client.js',
                    to: 'email-client.<%= pkg.version %>.min.js'
                }, {
                    from: 'email-client.css',
                    to: 'email-client.<%= pkg.version %>.min.css'
                }]
            },
            dev: {
                src: ['./src/index.html'],
                dest: './src/index.html',
                replacements: [{
                    from: 'vendors.<%= pkg.version %>.min.js',
                    to: 'vendors.js'
                }, {
                    from: 'email-client.<%= pkg.version %>.min.js',
                    to: 'email-client.js'
                }, {
                    from: 'email-client.<%= pkg.version %>.min.css',
                    to: 'email-client.css'
                }]
            }
        },
        watch: {
            js: {
                files: ['Gruntfile.js', 'src/app/**/*.js', 'test/spec/**/*.js'],
                tasks: ['jshint', 'concat:js', 'karma'],
                options: {
                    livereload: true 
                }
            },
            less: {
                files: ['./src/assets/**/*.less'],
                tasks: ['less:development'],
                options: {
                    livereload: true 
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        clean: ["test/coverage", "src/assets/js", "src/assets/css"]
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('prod', ['clean', 'less:prod', 'concat', 'uglify', 'replace:prod']);

    grunt.registerTask('default', ['clean', 'jshint', 'less:development', 'concat', 'replace:dev', 'watch']);
    
    grunt.registerTask('test', ['clean', 'jshint', 'concat', 'replace:dev', 'karma', 'watch']);
};