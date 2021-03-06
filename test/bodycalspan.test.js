var toPlainTable = require('../src/index');
var assert = require('chai').assert;
var jsdom = require("jsdom");
var { document } = (new jsdom.JSDOM('<!DOCTYPE html><body></body></html>')).window;
var fs = require('fs');

var _table = fs.readFileSync('./test/bodycalspan.html', 'utf8');

describe('toPlainTable', function () {
    beforeEach(function () {
        document.body.innerHTML = _table;
    });

    describe('table with calspan 3 in tbody', function () {
        it('has equal number of cells in the rows', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            document.querySelectorAll('tr').forEach(function (row) {
                assert.equal(row.querySelectorAll('td').length, 5);
            });
        });
        it('cells have no rowspan or calspan attributes', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            assert.equal(document.querySelectorAll('[colspan]').length, 0);
            assert.equal(document.querySelectorAll('[rowspan]').length, 0);
        });
        it('colspan content is replicated', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var firstRowCells = document.querySelectorAll('tr')[0].querySelectorAll('td');
            assert.equal(firstRowCells[0].innerHTML, '');
            assert.equal(firstRowCells[1].innerHTML, '');
            assert.equal(firstRowCells[2].innerHTML, 'one ');
            assert.equal(firstRowCells[3].innerHTML, 'one ');
            assert.equal(firstRowCells[4].innerHTML, 'one ');

            var secondRowCells = document.querySelectorAll('tr')[1].querySelectorAll('td');
            assert.equal(secondRowCells[0].innerHTML, '');
            assert.equal(secondRowCells[1].innerHTML, '');
            assert.equal(secondRowCells[2].innerHTML, ' two');
            assert.equal(secondRowCells[3].innerHTML, ' two');
            assert.equal(secondRowCells[4].innerHTML, ' two');
        });
    });
});