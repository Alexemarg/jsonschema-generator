const fs = require('fs');
const path = require('path');
const config = require('../jsonsgen.cfg.js');
const compile = require('./compile.js');
const logger = require('./logger.js');
const { uncache, delay, createJsonFile, createFolder, iterateScripts, watch } = require('./utils');

const programArgs = new Set(process.argv.slice(2));
const isDemo = programArgs.has('demo');
const isDev = programArgs.has('devmode');

const from = path.resolve(config.from);
const to = path.resolve(config.to);

createFolder(to);

async function processFile(path, name) {
  uncache(path);
  await delay(50);
  const res = compile(require(path));
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
          logger.update(name, bytes);
        });
    })
  }
  return [name, startBytes];
}, (result) => {
  const title = isDev ? '\x1b[34m[ Development ]' : '\x1b[33m[ Building ]';
  const caption = title + '\x1b[0m\n\x1b[35mSchemas:\x1b[0m';
  logger.init(caption, result);
})



