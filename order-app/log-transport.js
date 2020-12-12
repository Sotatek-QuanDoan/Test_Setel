const split = require('split2');
const pump = require('pump');
const through = require('through2');
const pretty = require('pino-pretty');

const myTransport = through.obj(function (chunk, enc, cb) {
  console.log(pretty()(chunk));
  cb();
});

pump(process.stdin, split(), myTransport);
