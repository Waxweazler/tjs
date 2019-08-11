module.exports = function (config) {
    config.set({
        basePath: '..',
        browsers: ['PhantomJS'],
        files: [
            'src/t.js',
            'test/spec/*.js'
        ],
        frameworks: ['jasmine'],
        plugins: ['karma-jasmine', 'karma-phantomjs-launcher'],
        singleRun: true
    })
};
