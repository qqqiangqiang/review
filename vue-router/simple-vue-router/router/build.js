// https://github.com/shelljs/shelljs
process.env.NODE_ENV = 'production';

const path = require('path');
const os = require('os');
const run = require('parallel-webpack').run;
const configPath = require.resolve('./webpack.config.js');

run(configPath, {
  watch: false,
  maxRetries: 0,
  // stats: true,
  maxConcurrentWorkers: os.cpus().length // 最小取2
}, (err, stats) => {
  if (err) {
  	console.log(err.message);
    process.exit(1);
  }
});
