const fs = require('fs');
const path = require('path');
const config = require('../jsonsgen.cfg.js');
const compile = require('./compile.js');

const programArgs = new Set(process.argv.slice(2));
const isDemo = programArgs.has('demo');

function createJsonFile(to, fileName, object, isNotUgly = false) {
  const data = JSON.stringify(object, null, (isNotUgly ? "\t" : null));
  fs.writeFileSync(path.resolve(to, fileName + '.json'), data);
  return data.length;
}

const from = path.resolve(config.from);
const to = path.resolve(config.to);

fs.mkdirSync(to, { recursive: true });

let result = {};
fs.readdirSync(from).forEach(fileName => {
  if (fileName.endsWith('.js')) {
    const filePath = path.resolve(from, fileName);
    const schemaName = fileName.replace(/\.js$/, '');
    const res = compile(require(filePath));
    const bytes = createJsonFile(to, schemaName, res, isDemo);

    result[schemaName] = (bytes / 1024).toFixed(3) + ' Kb';
  }

});

if (isDemo) console.log('\x1b[33m%s', '[ Demo building mode! ]');
console.log('\x1b[32m%s\x1b[0m', 'Schemas:');
console.table(result);
