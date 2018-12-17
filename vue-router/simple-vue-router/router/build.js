// https://github.com/shelljs/shelljs
require('shelljs/global');
process.env.NODE_ENV = 'production';

const path = require('path');
const os = require('os');
const run = require('parallel-webpack').run;
const configPath = require.resolve('./webpack.config.js');

const removeHashMain = path.join(__dirname, '../example/hash/main.*.js')
const removeHistoryMain = path.join(__dirname, '../example/history/main.*.js')

rm('-rf', removeHashMain)
rm('-rf', removeHistoryMain)

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
