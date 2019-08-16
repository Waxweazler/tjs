module.exports = function (config) {
    config.set({
        browsers: ['IE', 'PhantomJS'],
        files: ['src/*', 'test/*'],
        frameworks: ['jasmine'],
        plugins: ['karma-ie-launcher', 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-verbose-reporter'],
        reporters: ['verbose'],
        singleRun: true
    })
};
