var toPlainTable = require('../src/index');
var assert = require('chai').assert;
var jsdom = require("jsdom");
var { document } = (new jsdom.JSDOM('<!DOCTYPE html><body></body></html>')).window;
var fs = require('fs');

var _table = fs.readFileSync('./test/complextable.html', 'utf8');

describe('toPlainTable', function () {
    beforeEach(function () {
        document.body.innerHTML = _table;
    });

    describe('complex table', function () {
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
        it('colspan content is replicated', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var firstRowCells = document.querySelectorAll('tr')[0].cells;
            assert.equal(firstRowCells[0].innerHTML, '1');
            assert.equal(firstRowCells[1].innerHTML, '1');
            assert.equal(firstRowCells[2].innerHTML, '1');
            assert.equal(firstRowCells[3].innerHTML, '4');
            assert.equal(firstRowCells[4].innerHTML, '5');

            var secondRowCells = document.querySelectorAll('tr')[1].cells;
            assert.equal(secondRowCells[0].innerHTML, '1');
            assert.equal(secondRowCells[1].innerHTML, '2');
            assert.equal(secondRowCells[2].innerHTML, '3');
            assert.equal(secondRowCells[3].innerHTML, '4');
            assert.equal(secondRowCells[4].innerHTML, '5');
        
            var thirdRowCells = document.querySelectorAll('tr')[2].cells;
            assert.equal(thirdRowCells[0].innerHTML, '1');
            assert.equal(thirdRowCells[1].innerHTML, '2');
            assert.equal(thirdRowCells[2].innerHTML, '3');
            assert.equal(thirdRowCells[3].innerHTML, '4');
            assert.equal(thirdRowCells[4].innerHTML, '5');

            var fourthRowCells = document.querySelectorAll('tr')[3].cells;
            assert.equal(fourthRowCells[0].innerHTML, '1');
            assert.equal(fourthRowCells[1].innerHTML, '2');
            assert.equal(fourthRowCells[2].innerHTML, '2');
            assert.equal(fourthRowCells[3].innerHTML, '2');
            assert.equal(fourthRowCells[4].innerHTML, '5');

            var fifthRowCells = document.querySelectorAll('tr')[4].cells;
            assert.equal(fifthRowCells[0].innerHTML, '1');
            assert.equal(fifthRowCells[1].innerHTML, '2');
            assert.equal(fifthRowCells[2].innerHTML, '3');
            assert.equal(fifthRowCells[3].innerHTML, '3');
            assert.equal(fifthRowCells[4].innerHTML, '3');
        });
    });
});