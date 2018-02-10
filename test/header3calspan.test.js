var toPlainTable = require('../src/index');
var assert = require('chai').assert;
var jsdom = require("jsdom");
var { document } = (new jsdom.JSDOM('<!DOCTYPE html><body></body></html>')).window;
var fs = require('fs');

var _table = fs.readFileSync('./test/header3calspan.html', 'utf8');

describe('toPlainTable', function () {
    beforeEach(function () {
        document.body.innerHTML = _table;
    });

    describe('table with calspan 3 in header', function () {
        it('has equal number of cells in the rows', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var rows = document.querySelectorAll('tr');
            assert.equal(rows[0].querySelectorAll('th').length, 4);
            assert.equal(rows[1].querySelectorAll('th').length, 4);
            assert.equal(rows[2].querySelectorAll('td').length, 4);
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
        it('replicated cells have original attributes', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var firstRowCells = document.querySelectorAll('tr')[0].querySelectorAll('th');
            assert.equal(firstRowCells[1].getAttribute('class'), 'test');
            assert.equal(firstRowCells[1].getAttribute('data-test'), 'test');
            assert.equal(firstRowCells[2].getAttribute('class'), 'test');
            assert.equal(firstRowCells[2].getAttribute('data-test'), 'test');
            assert.equal(firstRowCells[3].getAttribute('class'), 'test');
            assert.equal(firstRowCells[3].getAttribute('data-test'), 'test');
        });
        it('colspan content is replicated', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var rows = document.querySelectorAll('tr');
            var firstHeaderCells = rows[0].querySelectorAll('th');
            assert.equal(firstHeaderCells[0].innerHTML, '1');
            assert.equal(firstHeaderCells[1].innerHTML, '23');
            assert.equal(firstHeaderCells[2].innerHTML, '23');
            assert.equal(firstHeaderCells[3].innerHTML, '23');
            var secondHeaderCells = rows[1].querySelectorAll('th');
            assert.equal(secondHeaderCells[0].innerHTML, '1');
            assert.equal(secondHeaderCells[1].innerHTML, '23');
            assert.equal(secondHeaderCells[2].innerHTML, '23');
            assert.equal(secondHeaderCells[3].innerHTML, '23');
        });
    });
});