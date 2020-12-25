const { BaseField, FObject, FArray, FNumber, FString, FSchema, FList, FInteger, FBoolean } = require('../types');

const Widget = {
  FORM: 'form',
  RADIO: 'radio',
  IMAGE: 'image',
  AUDIO: 'audio',
  SELECT: 'select',
  PICKER_COLOR: 'colorpicker',
  TEXTAREA: 'textarea',
  CODE_EDITOR: 'codeeditor',
  SELECT_IMAGE: 'selectimage',
}

class CustomField {
  constructor(fieldKey) {
    this._key = fieldKey
  }
  select = (...items) => new FInteger(this._key)
    .range(0, items.length - 1)
    .widget(Widget.SELECT)
    .set('_s', items)
  linkedSelect = (query) => new FInteger(this._key)
    .min(0)
    .widget(Widget.SELECT)
    .set('_query', query)
}

module.exports = function (fieldKey) {
  return new CustomField(fieldKey);
}