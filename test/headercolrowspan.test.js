var toPlainTable = require('../src/index');
var assert = require('chai').assert;
var jsdom = require("jsdom");
var { document } = (new jsdom.JSDOM('<!DOCTYPE html><body></body></html>')).window;
var fs = require('fs');

var _table = fs.readFileSync('./test/headercolrowspan.html', 'utf8');

describe('toPlainTable', function () {
    beforeEach(function () {
        document.body.innerHTML = _table;
    });

    describe('table with rowspan and colspan in header', function () {
        it('has equal number of cells in the rows', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var rows = document.querySelectorAll('tr');
            assert.equal(rows[0].querySelectorAll('th').length, 7);
            assert.equal(rows[1].querySelectorAll('th').length, 7);
            assert.equal(rows[2].querySelectorAll('td').length, 7);
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
        it('colspan and rowspan content is replicated', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var firstRowCells = document.querySelectorAll('tr')[0].querySelectorAll('th');
            assert.equal(firstRowCells[0].innerHTML, 'Homework');
            assert.equal(firstRowCells[1].innerHTML, 'Exams');
            assert.equal(firstRowCells[2].innerHTML, 'Exams');
            assert.equal(firstRowCells[3].innerHTML, 'Exams');
            assert.equal(firstRowCells[4].innerHTML, 'Projects');
            assert.equal(firstRowCells[5].innerHTML, 'Projects');
            assert.equal(firstRowCells[6].innerHTML, 'Projects');

            var secondRowCells = document.querySelectorAll('tr')[1].querySelectorAll('th');
            assert.equal(secondRowCells[0].innerHTML, 'Homework');
            assert.equal(secondRowCells[1].innerHTML, '1');
            assert.equal(secondRowCells[2].innerHTML, '2');
            assert.equal(secondRowCells[3].innerHTML, 'Final');
            assert.equal(secondRowCells[4].innerHTML, '1');
            assert.equal(secondRowCells[5].innerHTML, '2');
            assert.equal(secondRowCells[6].innerHTML, 'Final');

            var thirdRowCells = document.querySelectorAll('tr')[2].querySelectorAll('td');
            assert.equal(thirdRowCells[0].innerHTML, '15%');
            assert.equal(thirdRowCells[1].innerHTML, '15%');
            assert.equal(thirdRowCells[2].innerHTML, '15%');
            assert.equal(thirdRowCells[3].innerHTML, '20%');
            assert.equal(thirdRowCells[4].innerHTML, '10%');
            assert.equal(thirdRowCells[5].innerHTML, '10%');
            assert.equal(thirdRowCells[6].innerHTML, '15%');
        });
    });
});