module.exports = function (config) {
    config.set({
        basePath: '..',
        browsers: ['PhantomJS'],
        files: [
            'src/t.js',
            'test/spec/*.js'
        ],
        frameworks: ['jasmine', 'jquery-3.4.0'],
        plugins: ['karma-jasmine', 'karma-jquery', 'karma-phantomjs-launcher'],
        singleRun: true
    })
};
