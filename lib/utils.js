const fs = require('fs');
const path = require('path');

function uncache(module) {
  delete require.cache[require.resolve(module)];
}

function delay(t) {
  return new Promise(_ => setTimeout(_, t));
}

function createJsonFile(to, fileName, object, isNotUgly = false) {
  const data = JSON.stringify(object, null, (isNotUgly ? "\t" : null));
  fs.writeFileSync(path.resolve(to, fileName + '.json'), data);
  return data.length;
}

function bytesCaption(bytes) {
  const isKilo = bytes >= 1024;
  return isKilo ? (bytes / 1024).toFixed(3) + 'Kb' : bytes + 'b';
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
    cb();
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
}