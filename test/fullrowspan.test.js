var toPlainTable = require('../src/index');
var assert = require('chai').assert;
var jsdom = require("jsdom");
var { document } = (new jsdom.JSDOM('<!DOCTYPE html><body></body></html>')).window;
var fs = require('fs');

var _table = fs.readFileSync('./test/fullrowspan.html', 'utf8');

describe('toPlainTable', function () {
    beforeEach(function () {
        document.body.innerHTML = _table;
    });

    describe('row with rowspan on each cell', function () {
        it('has equal number of cells in the rows', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            document.querySelectorAll('tr').forEach(function (row) {
                assert.equal(row.childElementCount, 5);
            });
        });
        it('cells have no rowspan attributes', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            assert.equal(document.querySelectorAll('[rowspan]').length, 0);
        });
        it.only('colspan content is replicated', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var firstRowCells = document.querySelectorAll('tr')[0].cells;
            assert.equal(firstRowCells[0].innerHTML, '1');
            assert.equal(firstRowCells[1].innerHTML, '2');
            assert.equal(firstRowCells[2].innerHTML, '3');
            assert.equal(firstRowCells[3].innerHTML, '4');
            assert.equal(firstRowCells[4].innerHTML, '5');

            var secondRowCells = document.querySelectorAll('tr')[1].cells;
            assert.equal(secondRowCells[0].innerHTML, '1');
            assert.equal(secondRowCells[1].innerHTML, '2');
            assert.equal(secondRowCells[2].innerHTML, '3');
            assert.equal(secondRowCells[3].innerHTML, '4');
            assert.equal(secondRowCells[4].innerHTML, '5');
        });
    });
});