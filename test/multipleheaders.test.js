var toPlainTable = require('../src/index');
var assert = require('chai').assert;
var jsdom = require("jsdom");
var { document } = (new jsdom.JSDOM('<!DOCTYPE html><body></body></html>')).window;
var fs = require('fs');

var _table = fs.readFileSync('./test/multipleheaders.html', 'utf8');

describe('toPlainTable', function () {
    beforeEach(function () {
        document.body.innerHTML = _table;
    });

    describe('table with multiple headers', function () {
        it('has equal number of cells in the rows', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            document.querySelectorAll('tr').forEach(function(row) {
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
            assert.equal(firstRowCells[0].innerHTML, '');
            assert.equal(firstRowCells[1].innerHTML, 'Studio');
            assert.equal(firstRowCells[2].innerHTML, '\n                <abbr title="Apartment">Apt</abbr>\n            ');
            assert.equal(firstRowCells[3].innerHTML, 'Chalet');
            assert.equal(firstRowCells[4].innerHTML, 'Villa');

            var secondRowCells = document.querySelectorAll('tr')[1].cells;
            assert.equal(secondRowCells[0].innerHTML, 'Paris');
            assert.equal(secondRowCells[1].innerHTML, 'Paris');
            assert.equal(secondRowCells[2].innerHTML, 'Paris');
            assert.equal(secondRowCells[3].innerHTML, 'Paris');
            assert.equal(secondRowCells[4].innerHTML, 'Paris');

            var fifthRowCells = document.querySelectorAll('tr')[5].cells;
            assert.equal(fifthRowCells[0].innerHTML, 'Rome');
            assert.equal(fifthRowCells[1].innerHTML, 'Rome');
            assert.equal(fifthRowCells[2].innerHTML, 'Rome');
            assert.equal(fifthRowCells[3].innerHTML, 'Rome');
            assert.equal(fifthRowCells[4].innerHTML, 'Rome');
        });
    });
});