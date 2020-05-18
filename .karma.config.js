module.exports = function (config) {
  config.set({
      frameworks: ['mocha', 'chai'],
      files: [
          'slug.js',
          'test/**/*.js'
      ],
      reporters: ['progress'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      browsers: ['ChromeHeadless', 'Firefox'],
      autoWatch: false,
      concurrency: Infinity,
      customLaunchers: {
          FirefoxHeadless: {
              base: 'Firefox',
              flags: ['-headless'],
          },
      },
  })
}