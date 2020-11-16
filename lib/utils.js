const fs = require('fs');
const path = require('path');

function uncache(module) {
  delete require.cache[require.resolve(module)];
}

function delay(t) {
  return new Promise(_ => setTimeout(_, t))
}

function createJsonFile(to, fileName, object, isNotUgly = false) {
  const data = JSON.stringify(object, null, (isNotUgly ? "\t" : null));
  fs.writeFileSync(path.resolve(to, fileName + '.json'), data);
  return data.length;
}

function bytesCaption(bytes) {
  return (bytes / 1024).toFixed(3) + ' Kb';
}

function createFolder(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function iterateScripts(folder, cb, endCb) {
  const resArray = [];
  fs.readdirSync(folder).forEach(async (fullName, ix, arr) => {
    if (fullName.endsWith('.js')) {
      const res = await cb(fullName);
      resArray.push(res);
    };
    if (arr.length - 1 === ix) endCb(resArray);
  });
}

function logSchemaResult(name, size, isIncrease) {
  const color = isIncrease ? '\x1b[33m' : '\x1b[32m';
  const colorifier = isIncrease == null ? '%s' : color + '%s\x1b[0m';
  console.log(colorifier, (' "' + name + '"').padEnd(16, ' ') + bytesCaption(size))
}

function watch(path, cb) {
  const watchDelay = 500;
  let lastUpdTime = 0;
  fs.watch(path, (eventType, filename) => {
    if (
      lastUpdTime + watchDelay > Date.now()
      || !filename
      || eventType !== 'change'
    ) return;
    lastUpdTime = Date.now();
    cb()
  });
}

module.exports = {
  uncache,
  delay,
  watch,
  bytesCaption,
  createJsonFile,
  createFolder,
  iterateScripts,
  logSchemaResult,
}