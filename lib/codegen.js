const fs = require('fs');
const path = require('path');
const config = require('../jsonsgen.cfg.js');

const from = path.resolve(config.from);

function pseudoUUID() {
  return (Date.now() % 1e5).toString(36);
}

module.exports = function (schemaName = pseudoUUID()) {
  const filePath = path.resolve(from, schemaName + '.js');
  const code =
    `const $ = require('../lib/field');
const { Mark, Widget } = require('../lib/enums');

module.exports = $().schema()
  .title("${schemaName}")
  .defs()
  .props();`;

  fs.writeFile(filePath, code, { flag: 'wx' }, function (error) {
    if (error === null) {
      console.log('\x1b[32m%s\x1b[0m', `\n The "${schemaName}" schema was created succsesful!\n`);
    } else {
      console.log('\x1b[33m%s\x1b[0m', `\n The "${schemaName}" schema already exsists!\n`);
    }
  });
}