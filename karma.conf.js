module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['source-map-support', 'mocha', 'sinon'],
    files: [
      'app/app.tests.js'
    ],
    exclude: [],
    preprocessors: {
      'app/app.tests.js': ['coverage', 'webpack', 'sourcemap'],
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      // configure the reporter to use isparta for JavaScript coverage
      // Only on { "karma-coverage": "douglasduteil/karma-coverage#next" }
      instrumenters: { isparta : require('isparta') },
      instrumenter: {
        '**/*.js': 'isparta',
        '**/*.jsx': 'isparta'
      },
      reporters: [
        {type: 'lcov'},
        {type: 'text'}
      ]
    },
    pora: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [/*'Chrome', */'PhantomJS'],
    singleRun: true,
    webpack: require('./webpack/config.test'),
    webpackMiddleware: {
      noInfo: true,
      quiet: false
    }
  });
};
