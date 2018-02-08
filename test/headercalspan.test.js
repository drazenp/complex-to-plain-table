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
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var rows = document.querySelectorAll('tr');
            assert.equal(rows[0].querySelectorAll('th').length, 3);
            assert.equal(rows[1].querySelectorAll('td').length, 3);
        });
        it('cells have no rowspan or calspan attributes', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var rows = document.querySelectorAll('tr');
            rows[0].querySelectorAll('th').forEach(th => {
                assert.equal(th.hasAttribute('colspan'), false);
                assert.equal(th.hasAttribute('rowspan'), false);
            });
            rows[1].querySelectorAll('td').forEach(td => {
                assert.equal(td.hasAttribute('colspan'), false);
                assert.equal(td.hasAttribute('rowspan'), false);
            });
        });
        it('colspan content is replicated', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var headerCells = document.querySelectorAll('tr')[0].querySelectorAll('th');
            assert.equal(headerCells[0].innerHTML, '1');
            assert.equal(headerCells[1].innerHTML, '23');
            assert.equal(headerCells[2].innerHTML, '23');
        });
    });
});