
var cloneCellToRight = function (cell, colspan) {
    var parent = cell.parentElement;
    
    for (var i = 1; i < colspan; i++) {
        var newCell = cell.cloneNode(true);
        parent.insertBefore(newCell, cell.nextSibling);
    }
};

var splitCallSpans = function(cells){
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        if (cell.hasAttribute('colspan')) {
            var colspan = cell.getAttribute('colspan');
            cell.removeAttribute('colspan');
            cloneCellToRight(cell, colspan);
        }
    }
};

var cloneCellDownRows = function(cell, splitRowSpans) {
    var nextRow = cell.parentElement.nextElementSibling;
    var nextCell = nextRow.cells[cell.cellIndex];

    var newCell = cell.cloneNode(true);
    nextRow.insertBefore(newCell, nextCell);
    //document.getElementById('table1').rows[rowIndex].cells[cellIndex];
};

var splitRowSpans = function(cells) {
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        if (cell.hasAttribute('rowspan')) {
            var rowspan = cell.getAttribute('rowspan');
            cell.removeAttribute('rowspan');
            cloneCellDownRows(cell, rowspan);
        }
    }
};

var toPlainTable = function (element) {
    var cellsWithColspan = element.querySelectorAll('[colspan]');
    splitCallSpans(cellsWithColspan);
    var cellsWithRowspan = element.querySelectorAll('[rowspan]');
    splitRowSpans(cellsWithRowspan);
};

module.exports = toPlainTable;