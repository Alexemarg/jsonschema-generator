function addToProp(object, prop, val) {
  object[prop] = [...(object[prop] || []), val];
}

function unpack(object, parentObject = {}) {
  let res = object['_data'] ? object['_data'] : object;
  for (let key in res) {
    const val = res[key];
    if (typeof val === 'object') {
      const marks = val['_marks'] || [];
      marks.forEach(m => {
        addToProp(parentObject, m, key);
      });
      res[key] = unpack(val, res);
    }
  }
  return res;
}

module.exports = function compile(schemaObject) {
  return unpack(schemaObject);
}