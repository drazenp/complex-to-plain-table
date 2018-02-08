var toPlainTable = function(element) {
    var ths = element.getElementsByTagName('th');
    for(var i = 0; i < ths.length; i++) {
        var th = ths[i];
        if(th.hasAttribute('colspan')) {
            th.removeAttribute('colspan');
            var newTh = th.cloneNode(true);
            th.parentElement.insertBefore(newTh, th.nextSibling);
        }
    }
};

module.exports = toPlainTable;