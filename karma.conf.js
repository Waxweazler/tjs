module.exports = function (config) {
    config.set({
        browsers: ['IE', 'PhantomJS'],
        files: ['src/*', 'test/*'],
        frameworks: ['jasmine', 'jquery-3.4.0'],
        plugins: ['karma-ie-launcher', 'karma-jasmine', 'karma-jquery', 'karma-phantomjs-launcher', 'karma-verbose-reporter'],
        reporters: ['verbose'],
        singleRun: true
    })
};
