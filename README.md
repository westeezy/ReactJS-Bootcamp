## ReactJS Bootcamp
[![Build Status](https://travis-ci.org/westeezy/ReactJS-Bootcamp.svg?branch=master)](https://travis-ci.org/westeezy/ReactJS-Bootcamp)
[![Dependency Status](https://david-dm.org/westeezy/ReactJS-Bootcamp.svg)](https://david-dm.org/westeezy/ReactJS-Bootcamp)
[![devDependency Status](https://david-dm.org/westeezy/ReactJS-Bootcamp/dev-status.svg)](https://david-dm.org/westeezy/ReactJS-Bootcamp#info=devDependencies)
###Walkthrough
If you aren't able to attend and want to go through a walkthrough on your own, all materials are available in the [walkthrough directory].

Which also includes a [single day] format for presentations.


###How to Run the App
#### Running Locally
First, make sure you have [Node.js] installed ([npm] is Node's companion package manager). This application was built using Node 0.12, but it should work fine with most versions of Node and [io.js].

See these instructions for help [installing Node].

In the terminal, run `npm install` to pull in dependencies, followed by `npm start` to start the webpack dev server which will open a Chrome window.

* Note for windows users: environment variables are set differently so
  please use `npm run start-windows`

#### Docker Setup
If you are familiar with Docker, or are willing to learn it, there is a Dockerfile provided that will simply call `npm start` by default.  To get this running you could:
- CD into the working directory
- docker build . -t react-bootcamp
- docker run -p 8001:8001 react-bootcamp

NOTE: If you want to have the live updates enabled, you would need to properly mount the app directory as a volume.  Ex on Mac: `docker run -v $(pwd)/app:/app/app -p 8001:8001 react-bootcamp`

### Bootcamp Start
Bootcamp starts on a stripped down version of the master branch to start building up the application from scratch. Please see branch [ndc_day_one].



####TypeScript
For the TypeScript version of the code see [here][typescript]

[Node.js]: https://nodejs.org "Node.js"
[npm]: https://www.npmjs.com "npm"
[io.js]: https://iojs.org/ "io.js"
[installing Node]: https://github.com/joyent/node/wiki/installation "Installing Node"
[ndc_day_one]: https://github.com/westeezy/ReactJS-Bootcamp/tree/ndc_day_one "Branch ndc_day_one"
[typescript]: https://github.com/westeezy/ReactJS-Bootcamp/tree/typescript
[walkthrough directory]: https://github.com/westeezy/ReactJS-Bootcamp/tree/master/walkthroughs
[single day]: https://github.com/westeezy/ReactJS-Bootcamp/tree/master/walkthroughs/SingleDayFormat
