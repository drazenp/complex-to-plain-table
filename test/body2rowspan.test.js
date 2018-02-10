var toPlainTable = require('../src/index');
var assert = require('chai').assert;
var jsdom = require("jsdom");
var { document } = (new jsdom.JSDOM('<!DOCTYPE html><body></body></html>')).window;
var fs = require('fs');

var _table = fs.readFileSync('./test/body2rowspan.html', 'utf8');

describe('toPlainTable', function () {
    beforeEach(function () {
        document.body.innerHTML = _table;
    });

    describe('table with rowspan 2 in tbody', function () {
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
            document.querySelectorAll('tr').forEach(function (row) {
                row.querySelectorAll('td').forEach(td => {
                    assert.equal(td.hasAttribute('colspan'), false);
                    assert.equal(td.hasAttribute('rowspan'), false);
                });
            });
        });
        it('colspan content is replicated', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var firstRowCells = document.querySelectorAll('tr')[0].querySelectorAll('td');
            assert.equal(firstRowCells[0].innerHTML, '1');
            assert.equal(firstRowCells[1].innerHTML, '2');
            assert.equal(firstRowCells[2].innerHTML, ' one');

            var secondRowCells = document.querySelectorAll('tr')[1].querySelectorAll('td');
            assert.equal(secondRowCells[0].innerHTML, '1');
            assert.equal(secondRowCells[1].innerHTML, '2');
            assert.equal(secondRowCells[2].innerHTML, 'two ');
        });
    });
});