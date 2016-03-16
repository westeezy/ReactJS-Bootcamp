import 'babel-polyfill';

const context = require.context('.', true, /\-test\.js(x|)?$/);
context.keys().forEach(context);
