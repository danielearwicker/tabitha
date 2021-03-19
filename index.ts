export function tabulate(tabbedTable: string) {

    const lines = tabbedTable.split("\n").map(l => l.split("\t"));

    function reduceCellLengths(line1: number[], line2: number[]) {
        const count = Math.max(line1.length, line2.length);

        const result: number[] = new Array(count);
        
        for (let i = 0; i < count; i++) {
            result[i] = Math.max(line1[i] || 0, line2[i] || 0);
        }

        return result;
    }

    const cellLengths = lines.map(l => l.map(c => c.length)).reduce(reduceCellLengths);
    if (cellLengths.length === 0) {
        return tabbedTable;
    }

    function padCells(line: string[]) {
        return cellLengths.map((c, i) => (line[i] || "").padEnd(c, " "));
    }

    const [header, ...rows] = lines.map(l => padCells(l).join(" | "));

    if (!rows || rows.length === 0) {
        return header;
    }

    const divider = cellLengths.map(c => "-".repeat(c)).join("-|-");

    return [header, divider, ...rows].join("\n");
}
