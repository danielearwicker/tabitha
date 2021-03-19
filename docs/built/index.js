"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tabulate(tabbedTable) {
    var lines = tabbedTable.split("\n").map(function (l) { return l.split("\t"); });
    function reduceCellLengths(line1, line2) {
        var count = Math.max(line1.length, line2.length);
        var result = new Array(count);
        for (var i = 0; i < count; i++) {
            result[i] = Math.max(line1[i] || 0, line2[i] || 0);
        }
        return result;
    }
    var cellLengths = lines.map(function (l) { return l.map(function (c) { return c.length; }); }).reduce(reduceCellLengths);
    if (cellLengths.length === 0) {
        return tabbedTable;
    }
    function padCells(line) {
        return cellLengths.map(function (c, i) { return (line[i] || "").padEnd(c, " "); });
    }
    var _a = lines.map(function (l) { return padCells(l).join(" | "); }), header = _a[0], rows = _a.slice(1);
    if (!rows || rows.length === 0) {
        return header;
    }
    var divider = cellLengths.map(function (c) { return "-".repeat(c); }).join("-|-");
    return [header, divider].concat(rows).join("\n");
}
exports.tabulate = tabulate;
