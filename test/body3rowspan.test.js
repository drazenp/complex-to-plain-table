var toPlainTable = require('../src/index');
var assert = require('chai').assert;
var jsdom = require("jsdom");
var { document } = (new jsdom.JSDOM('<!DOCTYPE html><body></body></html>')).window;
var fs = require('fs');

var _table = fs.readFileSync('./test/body3rowspan.html', 'utf8');

describe('toPlainTable', function () {
    beforeEach(function () {
        document.body.innerHTML = _table;
    });

    describe('table with rowspan 3 in tbody', function () {
        it('has equal number of cells in the rows', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            document.querySelectorAll('tr').forEach(function (row) {
                assert.equal(row.querySelectorAll('td').length, 3);
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
        it('rowspan content is replicated', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var firstRowCells = document.querySelectorAll('tr')[0].querySelectorAll('td');
            assert.equal(firstRowCells[0].innerHTML, '1');
            assert.equal(firstRowCells[1].innerHTML, '2');
            assert.equal(firstRowCells[2].innerHTML, '3');

            var secondRowCells = document.querySelectorAll('tr')[1].querySelectorAll('td');
            assert.equal(secondRowCells[0].innerHTML, '1');
            assert.equal(secondRowCells[1].innerHTML, 'two');
            assert.equal(secondRowCells[2].innerHTML, 'two');

            var thirdRowCells = document.querySelectorAll('tr')[2].querySelectorAll('td');
            assert.equal(thirdRowCells[0].innerHTML, '1');
            assert.equal(thirdRowCells[1].innerHTML, '');
            assert.equal(thirdRowCells[2].innerHTML, 'two');
            
            var forthRowCells = document.querySelectorAll('tr')[3].querySelectorAll('td');
            assert.equal(forthRowCells[0].innerHTML, '');
            assert.equal(forthRowCells[1].innerHTML, '');
            assert.equal(forthRowCells[2].innerHTML, 'two');
        });
    });
});