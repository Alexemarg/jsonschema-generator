const fs = require('fs');
const path = require('path');
const config = require('../jsonsgen.cfg.js');
const compile = require('./compile.js');
const { uncache, delay, createJsonFile, createFolder, iterateScripts, logSchemaResult, watch } = require('./utils');

const programArgs = new Set(process.argv.slice(2));
const isDemo = programArgs.has('demo');
const isDev = programArgs.has('devmode');

const from = path.resolve(config.from);
const to = path.resolve(config.to);

createFolder(to);

async function processFile(fpath, name) {
  uncache(fpath);
  await delay(50);
  // FIXME: require не обновляет файл
  const res = compile(require(fpath));
  return createJsonFile(to, name, res, isDemo || isDev);
}

iterateScripts(from, async (fullName) => {
  const filePath = path.resolve(from, fullName);
  const name = fullName.replace(/\.js$/, '');
  const startBytes = await processFile(filePath, name);
  if (isDev) {
    watch(filePath, function () {
      processFile(filePath, name)
        .then(bytes => {
          const isInc = startBytes === bytes ? null : startBytes < bytes;
          logSchemaResult(name, bytes, isInc);
        });
    })
  }
  return [name, startBytes];
}, (result) => {
  if (isDev) console.log('\x1b[34m%s', '[ Development mode ]');
  console.log('\x1b[32m%s\x1b[0m', 'Schemas:');
  result.forEach((fstat) => {
    logSchemaResult(...fstat);
  })
})



