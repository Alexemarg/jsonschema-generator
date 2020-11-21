const { BaseField, FObject, FArray, FNumber, FString, FSchema, FList, FInteger, FBoolean } = require('./types')

class Field {
  constructor(fieldKey) {
    this._key = fieldKey
  }
  int = () => new FNumber(this._key)
  int = () => new FInteger(this._key)
  obj = () => new FObject(this._key)
  str = () => new FString(this._key)
  bool = () => new FBoolean(this._key)
  schema = () => new FSchema(this._key)
  arr = (items) => new FArray(this._key).items(items)
  set = (items) => new FArray(this._key).items(items).unique()
  ref = (id_string) => new BaseField(this._key).set('$ref', id_string)
  list = (key, value) => new FList(this._key).propNames(key).additProps(value)
}

module.exports = function (fieldKey) {
  return new Field(fieldKey);
}