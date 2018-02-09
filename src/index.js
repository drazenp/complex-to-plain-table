
var cloneCell = function (cell, colspan) {
    var parent = cell.parentNode;
    var appendToParent = (parent.lastChild == cell);
    
    for (var i = 1; i < colspan; i++) {
        var newCell = cell.cloneNode(true);
        if(appendToParent) {
            parent.appendChild(newCell);
        } else {
            parent.insertBefore(newCell, cell.nextSibling);
        }
    }
};

var splitCallSpans = function(headerCells){
    for (var i = 0; i < headerCells.length; i++) {
        var th = headerCells[i];
        if (th.hasAttribute('colspan')) {
            var colspan = th.getAttribute('colspan');
            th.removeAttribute('colspan');
            cloneCell(th, colspan);
        }
    }
};

var toPlainTable = function (element) {
    var headerCells = element.getElementsByTagName('th');
    splitCallSpans(headerCells);
    var bodyCells = element.getElementsByTagName('td');
    splitCallSpans(bodyCells);
};

module.exports = toPlainTable;