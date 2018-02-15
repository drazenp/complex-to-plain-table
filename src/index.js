(function () {
    'use strict';
    var toPlainTable = (function () {
        var toPlainTable = function (element) {
            _splitCells(element, 'colspan', cloneCellToRight);
            _splitCells(element, 'rowspan', cloneCellDownRows);
        };

        var _splitCells = function (element, spanAttribute, cloneCell) {
            var cellsWithSpanAttribute = element.querySelectorAll('[' + spanAttribute + ']');
            for (var i = 0; i < cellsWithSpanAttribute.length; i++) {
                var cell = cellsWithSpanAttribute[i];
                if (cell.hasAttribute(spanAttribute)) {
                    var count = cell.getAttribute(spanAttribute);
                    cell.removeAttribute(spanAttribute);
                    cloneCell(cell, +count);
                }
            }
        };

        var cloneCellToRight = function (cell, colspan) {
            var parent = cell.parentElement;

            for (var i = 1; i < colspan; i++) {
                var newCell = cell.cloneNode(true);
                parent.insertBefore(newCell, cell.nextSibling);
            }
        };

        var cloneCellDownRows = function (cell, count) {
            if (count < 2) return;

            var nextRow = cell.parentElement.nextElementSibling;
            var nextCell = nextRow.cells[cell.cellIndex];

            var newCell = cell.cloneNode(true);
            nextRow.insertBefore(newCell, nextCell);
            cloneCellDownRows(newCell, --count);
        };

        return toPlainTable;
    })();

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = toPlainTable;
    }
    else {
        if (typeof define === 'function' && define.amd) {
            define([], function () {
                return toPlainTable;
            });
        }
        else {
            window.toPlainTable = toPlainTable;
        }
    }
})();
