const $ = require('../lib/types');
const { Mark, Widget } = require('../lib/enums');

module.exports = $().schema()
  .title('Example schema')
  .props(
    $('name')
      .str()
      .mark(Mark.required)
      .range(3, 20),
    $('age')
      .int()
      .range(10, 80),
    $('description')
      .str()
      .widget(Widget.text)
      .max(1024),
    $('isBanned')
      .bool()
      .default(false)
      .mark(Mark.required, Mark.private),
  );
