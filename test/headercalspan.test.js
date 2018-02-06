var toPlainTable = require('../src/index');
var assert = require('chai').assert;
var jsdom = require("jsdom");
var { document } = (new jsdom.JSDOM('<!DOCTYPE html><body></body></html>')).window;
var fs = require('fs');

var _table = fs.readFileSync('./test/headercalspan.html', 'utf8');

describe('toPlainTable', function () {
    beforeEach(function () {
        document.body.innerHTML = _table;
    });

    describe('table with calspan 2 in header', function () {
        it('has equal number of cells in the rows', function () {
            var rows = document.querySelectorAll('tr');
            assert.equal(rows[0].querySelectorAll('th').length, 3);
            assert.equal(rows[1].querySelectorAll('td').length, 3);
        });
    });
});