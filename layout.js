"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deferred execution SQL-like functions
const query_1 = require("./lib/query");
// import demo data
const demoData_json_1 = __importDefault(require("./demoData.json"));
function getDemoData() {
    return demoData_json_1.default;
}
exports.getDemoData = getDemoData;
function optimise(applications, dX, dY, method = bruteForce) {
    // find the unique values on the x and y axis
    const aX = query_1.toArray(query_1.distinct(query_1.selectMany(applications, app => app.uses, (app, use) => use[dX])));
    const aY = query_1.toArray(query_1.distinct(query_1.selectMany(applications, app => app.uses, (app, use) => use[dY])));
    // call the passes optimisation method
    const start = new Date().getTime();
    const result = method(applications, { dimension: dX, values: aX }, { dimension: dY, values: aY });
    const end = new Date().getTime();
    console.log(`bruteForce optimisation took ${end - start}ms`);
    return result;
}
exports.optimise = optimise;
function bruteForce(applications, axisX, axisY) {
    // Use selectMany to create denormalise apps where the status is the same
    const appsToTest = query_1.toArray(query_1.where(applications, app => app.uses.length > 1)); // TODO: go further and filter on app/status combinations
    let result = [];
    let scenarios = 0;
    // iterate all permutations of the X and Y axis
    for (const pX of query_1.permutations(axisX.values)) {
        for (const pY of query_1.permutations(axisY.values)) {
            let affinity = 0;
            scenarios++;
            // test each application individually
            for (const application of appsToTest) {
                for (const status of query_1.distinct(query_1.select(application.uses, a => a.status))) {
                    // create a two dimensional array of boolean values where the application exists in this scenario
                    const matrix = query_1.toArray(query_1.select(pX, x => query_1.toArray(query_1.select(pY, y => query_1.exists(query_1.where(application.uses, use => use.status === status && use[axisX.dimension] === x && use[axisY.dimension] === y))))));
                    // test for affinity on the X any Y dimensions
                    for (let iX = pX.length; iX--;) {
                        for (let iY = pY.length; iY--;) {
                            if (iX && matrix[iX][iY] && matrix[iX - 1][iY]) {
                                affinity++;
                            }
                            if (iY && matrix[iX][iY] && matrix[iX][iY - 1]) {
                                affinity++;
                            }
                        }
                    }
                }
            }
            // just keep the best scenario
            if (result.length === 0 || affinity >= result[0].affinity) {
                const scenario = { xAxis: { dimension: axisX.dimension, values: pX }, yAxis: { dimension: axisY.dimension, values: pY }, affinity: affinity };
                if (result.length === 0 || affinity > result[0].affinity) {
                    result = [];
                }
                result.push(scenario);
            }
        }
    }
    console.log(`Tested ${appsToTest.length} applications in ${scenarios} scenarios`);
    console.log(`Returning ${result.length} scenarios with affinity score of ${result.length === 0 ? 0 : result[0].affinity}`);
    return result;
}
exports.bruteForce = bruteForce;
// TODO: implement fixX and fixY versions of bruteForce - perms of non-fixed dimension only
class Cell {
    constructor(name, status, colspan = 1, rowspan = 1) {
        this.name = name;
        this.status = status;
        this.colspan = colspan;
        this.rowspan = rowspan;
    }
}
exports.Cell = Cell;
function prepare(applications, scenario) {
    const start = new Date().getTime();
    // denormalise the underlying application data
    const flattened = query_1.toArray(query_1.selectMany(applications, a => a.uses, (a, u) => { return { name: a.name, capability: u.capability, product: u.product, location: u.location, status: u.status }; }));
    // build the result table, 3D array: rows, columns, and 0..n apps, including the x and y axis
    const xAxis = [[new Cell("", "xAxis")], ...query_1.select(scenario.xAxis.values, x => [new Cell(x, "xAxis")])];
    const result = [xAxis, ...query_1.select(scenario.yAxis.values, y => [[new Cell(y, "yAxis")], ...query_1.select(scenario.xAxis.values, x => query_1.toArray(query_1.select(query_1.where(flattened, a => a[scenario.xAxis.dimension] === x && a[scenario.yAxis.dimension] === y), a => new Cell(a.name, a.status))))])];
    // TODO: Split cells with multiple values in it
    // merge adjacent cells - try on the x-axis first, then the y axis
    for (let iY = result.length; iY--;) {
        for (let iX = result[iY].length; iX--;) {
            let merged = false;
            if (result[iY][iX].length === 1) { // NOTE: will still be required to test for empty cells
                const app = result[iY][iX][0];
                if (merged === false && iY > 0) {
                    const above = result[iY - 1][iX];
                    if (above.length === 1 && app.name === above[0].name && app.status === above[0].status && app.colspan === above[0].colspan) {
                        above[0].rowspan += app.rowspan;
                        result[iY].splice(iX, 1);
                        merged = true;
                    }
                }
                if (merged === false && iX > 0) {
                    const left = result[iY][iX - 1];
                    if (left.length === 1 && app.name === left[0].name && app.status === left[0].status) {
                        left[0].colspan += app.colspan;
                        result[iY].splice(iX, 1);
                        merged = true;
                    }
                }
            }
        }
    }
    const end = new Date().getTime();
    console.log(`table preparation took ${end - start}ms`);
    return result;
}
exports.prepare = prepare;
