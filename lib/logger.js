const { bytesCaption } = require('./utils');

const startValues = new Map();
const valsList = new Map();
let capt = '';

function log(caption, valsMap, startValsMap) {
  console.clear();
  const longestNameSize = [...valsMap.keys()].reduce((a, v) => v.length > a ? v.length : a, 0);
  console.log(caption);
  for (const [name, size] of valsMap) {
    const space = ' '.repeat(longestNameSize - name.length);
    let color = '', postfix = '';
    if (startValsMap) {
      const startSize = startValsMap.get(name);
      const isIncrease = startSize === size ? null : startSize < size;
      if (isIncrease !== null) {
        color = isIncrease ? '\x1b[34m' : '\x1b[32m';
        postfix = `(${isIncrease ? '+' : '-'}${bytesCaption(Math.abs(startSize - size))})`;
      }
    }
    const sizeCapt = bytesCaption(size);
    let str = `${color}  ${name}${space} : ${sizeCapt} ${postfix}\x1b[0m`;
    console.log(str);
  }
}

module.exports = {
  init(caption, valuesList) {
    valuesList.forEach(kv => {
      startValues.set(...kv);
      valsList.set(...kv);
    });
    capt = caption;
    log(capt, valsList);
  },
  update(key, val) {
    valsList.set(key, val);
    log(capt, valsList, startValues);
  },
}