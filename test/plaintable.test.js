var toPlainTable = require('../src/index');
var chai = require('chai');
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var fs = require('fs');

var _table = JSDOM.fragment(fs.readFile('./test/plaintable.html'), 'utf8');

describe('toPlainTable', function() {
    describe('Plain table', function() {
        it('already has equal number of cells in rows', function() {
            _table.querySelectorAll('tr').forEach(row => {
                assert.equal(row.querySelectorAll(td), 3);
            });
        });
    });
});