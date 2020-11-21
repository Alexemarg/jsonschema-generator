const fs = require('fs');
const path = require('path');
const config = require('../jsonsgen.cfg.js');
const { createFolder } = require('./utils');
const { compileFromFile } = config.tsgen.enabled ? require('json-schema-to-typescript') : {};

const prefix = config.tsgen.prefix || '';
const postfix = config.tsgen.postfix || '';
const opts = {
  ...config.tsgen.options,
};
const to = path.resolve(config.tsgen.to || config.to || 'dist')

module.exports = async function createTypeDefsFile(fromPath, name) {
  createFolder(to);
  const ts = await compileFromFile(fromPath, opts);
  const filePath = path.resolve(to, `${prefix + name + postfix}.d.ts`);
  fs.writeFileSync(filePath, ts)
  return ts.length;
}