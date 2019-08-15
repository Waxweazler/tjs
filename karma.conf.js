module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        files: ['src/*', 'test/*'],
        frameworks: ['jasmine'],
        plugins: ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-verbose-reporter'],
        reporters: ['verbose'],
        singleRun: true
    })
};
