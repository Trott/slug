module.exports = function (config) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
    process.exit(1)
  }

  const customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      browserVersion: 'latest'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      browserVersion: 'latest'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      browserVersion: 'latest'
    }
  }

  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'slug.js',
      'node_modules/requirejs/require.js', // Used to test loading via AMD.
      'test/slug.test.js',
      'test/**/*.js'
    ],
    reporters: ['dots', 'saucelabs'],
    port: 9876,
    colors: true,
    sauceLabs: {
      testName: 'slug',
      recordScreenshots: false,
      public: 'public',
    },
    autoWatch: false,
    concurrency: Infinity,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true
  })
}
