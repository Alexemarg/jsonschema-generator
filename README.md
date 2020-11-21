# JSONSchema generator
This is a simple javascript based JSON Schema generator without dependencies
## Example
### Input:
```js
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

```
### Output:
```json
{
	"type": "object",
	"$schema": "http://json-schema.org/draft-07/schema#",
	"title": "Example schema",
	"properties": {
		"name": {
			"type": "string",
			"minLength": 3,
			"maxLength": 20
		},
		"age": {
			"type": "integer",
			"minimum": 10,
			"maximum": 80
		},
		"description": {
			"type": "string",
			"widget": "textarea",
			"maxLength": 1024
		},
		"isBanned": {
			"type": "boolean",
			"default": false
		}
	},
	"required": [
		"name",
		"isBanned"
	],
	"_private": [
		"isBanned"
	]
}
```
## Instruction
1. Clone this repository `git clone https://github.com/Alexemarg/jsonschema-generator`
1. Create schema by `node create [schemaName]` command
1. Run `build` command
## Features
1. Configurable
1. Code generation by command
1. Watching changes
1. TypeScript generation