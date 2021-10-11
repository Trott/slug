module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'slug.js',
      'node_modules/requirejs/require.js', // Used to test loading via AMD.
      'test/**/*.js',
    ],
    preprocessors: { 'slug.js': 'coverage' },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: '.nyc_output',
      reporters: [
        { type: 'json', subdir: '.', file: 'karma.json' }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless', 'Firefox', 'IE'],
    autoWatch: false,
    concurrency: Infinity,
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless']
      }
    }
  })
}
