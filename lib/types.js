function fieldArrayToObject(fields) {
  const res = {};
  fields.forEach(f => {
    res[f['_key']] = f;
  })
  return res;
}

class BaseField {
  constructor(fieldKey) {
    this._key = fieldKey;
    this._data = new Object();
  }
  set(key, value) {
    this._data[key] = value;
    return this;
  }
  id(string) {
    this.set('$id', string);
    return this;
  }
  type(string) {
    this.set('type', string);
    return this;
  }
  title(string) {
    this.set('title', string);
    return this;
  }
  descript(string) {
    this.set('description', string);
    return this;
  }
  widget(string) {
    this.set('widget', string);
    return this;
  }
  default(any) {
    this.set('default', any);
    return this;
  }
  examples(any_array) {
    this.set('examples', any_array);
    return this;
  }
  mark(...modificators) {
    this._marks = modificators;
    return this;
  }
}

class FObject extends BaseField {
  constructor(fieldKey) {
    super(fieldKey);
    this.type('object');
  }
  props(...fields) {
    this.set('properties', fieldArrayToObject(fields));
    return this;
  }
  min(integer) {
    this.set('minProperties', integer);
    return this;
  }
  max(integer) {
    this.set('maxProperties', integer);
    return this;
  }
  range(min_integer, max_integer) {
    this.min(min_integer);
    this.max(max_integer);
    return this;
  }
}

class FArray extends BaseField {
  constructor(fieldKey) {
    super(fieldKey);
    this.type('array');
    if (items) {
      this.items(items);
    }
  }
  items(object_array) {
    this.set('items', object_array);
    return this;
  }
  min(integer) {
    this.set('minItems', integer);
    return this;
  }
  max(integer) {
    this.set('maxItems', integer);
    return this;
  }
  range(min_integer, max_integer) {
    this.min(min_integer);
    this.max(max_integer);
    return this;
  }
  unique() {
    this.set('uniqueItems', true);
    return this;
  }
}

class FNumber extends BaseField {
  constructor(fieldKey) {
    super(fieldKey);
    this.type('number');
  }
  min(integer) {
    this.set('minimum', integer);
    return this;
  }
  max(integer) {
    this.set('maximum', integer);
    return this;
  }
  range(min_integer, max_integer) {
    this.min(min_integer);
    this.max(max_integer);
    return this;
  }
}

class FString extends BaseField {
  constructor(fieldKey) {
    super(fieldKey);
    this.type('string');
  }
  min(integer) {
    this.set('minLength', integer);
    return this;
  }
  max(integer) {
    this.set('maxLength', integer);
    return this;
  }
  range(min_integer, max_integer) {
    this.min(min_integer);
    this.max(max_integer);
    return this;
  }
  pattern(string_regexp) {
    // TODO: regexp convertor
    this.set('pattern', string_regexp);
    return this;
  }
}

class FSchema extends FObject {
  constructor(fieldKey) {
    super(fieldKey);
    this.set('$schema', 'http://json-schema.org/draft-07/schema#')
  }
  defs(...fields) {
    const object = fieldArrayToObject(fields)
    Object.keys(object).forEach(key => {
      object[key].id('#' + key);
    });
    this.set('definitions', object);
    return this;
  }
}

class FList extends FObject {
  constructor(fieldKey) {
    super(fieldKey);
    if (key) {
      this.propNames(key);
    }
    if (val) {
      this.additProps(val);
    }
  }
  propNames(any) {
    this.set('propertyNames', any);
    return this;
  }
  additProps(any) {
    this.set('additionalProperties', any);
    return this;
  }
}

class FInteger extends FNumber {
  constructor(fieldKey) {
    super(fieldKey);
    this.type('integer');
  }
}

class FBoolean extends BaseField {
  constructor(fieldKey) {
    super(fieldKey);
    this.type('boolean');
  }
}

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
};
