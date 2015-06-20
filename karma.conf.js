module.exports = function(config) {
    config.set({
        frameworks: ['jasmine-jquery','jasmine-ajax', 'jasmine'],
        files: [
            'src/assets/js/vendors.js',
            'src/javascript/utils/**/*.js',
            'src/javascript/services/**/*.js',
            'src/javascript/controllers/**/*.js',
            'test/spec/**/*.js'
        ],
        preprocessors: {
            '**/src/javascript/**/*.js': 'coverage'
        },

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            reporters: [{
                type: 'html',
                dir: 'test/coverage/'
            }, {
                type: 'text-summary',
                dir: 'test/coverage'
            }],
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};
