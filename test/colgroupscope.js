var toPlainTable = require('../src/index');
var assert = require('chai').assert;
var jsdom = require("jsdom");
var { document } = (new jsdom.JSDOM('<!DOCTYPE html><body></body></html>')).window;
var fs = require('fs');

var _table = fs.readFileSync('./test/colgroupscope.html', 'utf8');

describe.skip('toPlainTable', function () {
    beforeEach(function () {
        document.body.innerHTML = _table;
    });

    describe('table with colgroup scope', function () {
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
        it('cells have no rowspan or calspan attributes', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            assert.equal(document.querySelectorAll('[colspan]').length, 0);
            assert.equal(document.querySelectorAll('[rowspan]').length, 0);
        });
        it('colgroup have no span attributes', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            document.querySelectorAll('[span]').forEach(function (colgroup) {
                assert.equal(colgroup.hasAttribute('span'), false);
            });
        });
        it('headers cells does not have scope colgroup attributes', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            document.querySelectorAll('th').forEach(function (colgroup) {
                assert.notEqual(colgroup.getAttribute('scope'), 'colgroup');
            });
        });
        it('colspan content is replicated', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var firstRowCells = document.querySelectorAll('tr')[0].cells;
            assert.equal(firstRowCells[0].innerHTML, '');
            assert.equal(firstRowCells[1].innerHTML, 'Mars');
            assert.equal(firstRowCells[2].innerHTML, 'Mars');
            assert.equal(firstRowCells[3].innerHTML, 'Venus');
            assert.equal(firstRowCells[4].innerHTML, 'Venus');

            var secondRowCells = document.querySelectorAll('tr')[1].cells;
            assert.equal(secondRowCells[0].innerHTML, '');
            assert.equal(secondRowCells[1].innerHTML, 'Produced');
            assert.equal(secondRowCells[2].innerHTML, 'Sold');
            assert.equal(secondRowCells[3].innerHTML, 'Produced');
            assert.equal(secondRowCells[4].innerHTML, 'Sold');
        });
    });
});