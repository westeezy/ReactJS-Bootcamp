'use strict';

import 'babel-core/polyfill';

let context = require.context('.', true, /\-test\.js(x|)?$/);
context.keys().forEach(context);
