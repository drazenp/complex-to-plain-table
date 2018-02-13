# Complex To Plain Table
JavaScript library which can be used to simplify complex tables by splitting
merged cells.
Table cells which are merged by `colspan` and `rowspan` attributes will be
duplicated including cell content.

## Installation

`npm install complex-to-plain-table --save`

# How to use it
```js
var complexToPlainTable = require("complex-to-plain-table")
complexToPlainTable(document.querySelector('table'));
```

## Tests
`npm test`

## Example
Table input:

```html
<table border="1">
    <tr>
        <td colspan="3">1</td>
        <td>4</td>
        <td rowspan="3">5</td>
    </tr>
    <tr>
        <td>1</td>
        <td rowspan="2">2</td>
        <td>3</td>
        <td>4</td>
    </tr>
    <tr>
        <td rowspan="2">1</td>
        <td>3</td>
        <td>4</td>
    </tr>
    <tr>
        <td colspan="3">2</td>
        <td>5</td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
        <td colspan="3">3</td>
    </tr>
</table>
```
<table border="1">
    <tr>
        <td colspan="3">1</td>
        <td>4</td>
        <td rowspan="3">5</td>
    </tr>
    <tr>
        <td>1</td>
        <td rowspan="2">2</td>
        <td>3</td>
        <td>4</td>
    </tr>
    <tr>
        <td rowspan="2">1</td>
        <td>3</td>
        <td>4</td>
    </tr>
    <tr>
        <td colspan="3">2</td>
        <td>5</td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
        <td colspan="3">3</td>
    </tr>
</table>

Table output:

```html
<table border="1">
    <tbody>
        <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>4</td>
            <td>5</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>5</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
        </tr>
    </tbody>
</table>
```
<table border="1">
    <tbody>
        <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>4</td>
            <td>5</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>5</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
        </tr>
    </tbody>
</table>

## License
MIT