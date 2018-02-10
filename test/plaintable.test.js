var toPlainTable = require('../src/index');
var assert = require('chai').assert;
var jsdom = require("jsdom");
var { document } = (new jsdom.JSDOM('<!DOCTYPE html><body></body></html>')).window;
var fs = require('fs');

var _table = fs.readFileSync('./test/plaintable.html', 'utf8');

describe('toPlainTable', function () {
    describe('plain table', function () {
        beforeEach(function () {
            document.body.innerHTML = _table;
        });

        it('has equal number of cells in rows', function () {
            // arrange
            var table = document.querySelector('table');

            // act
            toPlainTable(table);

            // assert
            var rows = document.querySelectorAll('tr');
            assert.equal(rows[0].querySelectorAll('th').length, 3);
            assert.equal(rows[1].querySelectorAll('td').length, 3);
            assert.equal(rows[2].querySelectorAll('td').length, 3);
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
    });
});