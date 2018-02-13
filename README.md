# Complex To Plain Table
JavaScript library which can be used to simplify complex tables by splitting
merged cells.
Table cells which are merged by `colspan` and `rowspan` attributes will be
duplicated including cell content.

# How to use it
```js
var complexToPlainTable = require("complex-to-plain-table")
complexToPlainTable(document.querySelector('table'));
```

## License
MIT