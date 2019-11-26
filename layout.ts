// deferred execution SQL-like functions
import { exists, distinct, permutations, select, toArray, where, selectMany } from './lib/query';

// import demo data
import demoData from './demoData.json';

export interface IApplicationUse {
	product: string;
	capability: string;
	location: string;
	status: string; // TODO: remove status and create seperate meta data
}

export type Dimension = keyof IApplicationUse;

export interface IAxis {
	dimension: Dimension;
	values: Array<string>;
}

export interface IApplication {
	name: string;
	uses: Array<IApplicationUse>;
}

export interface IScenario {
	xAxis: IAxis;
	yAxis: IAxis;

	affinity: number;
}

export function getDemoData(): Array<IApplication> {
	return demoData;
}

export function optimise(applications: Array<IApplication>, dX: Dimension, dY: Dimension, method: (applications: Array<IApplication>, axisX: IAxis, axisY: IAxis) => Array<IScenario> = bruteForce): Array<IScenario> {
	// find the unique values on the x and y axis
	const aX = toArray(distinct(selectMany(applications, app => app.uses, (app, use) => use[dX])));
	const aY = toArray(distinct(selectMany(applications, app => app.uses, (app, use) => use[dY])));

	// call the passes optimisation method
	const start = new Date().getTime();
	const result = method(applications, { dimension: dX, values: aX }, { dimension: dY, values: aY });
	const end = new Date().getTime();

	console.log(`bruteForce optimisation took ${end - start}ms`);

	return result;
}

export function bruteForce(applications: Array<IApplication>, axisX: IAxis, axisY: IAxis): Array<IScenario> { // TODO: pass in methods for x and y that are currently hard-coded to permutations
	// Use selectMany to create denormalise apps where the status is the same
	const appsToTest = toArray(where(applications, app => app.uses.length > 1)); // TODO: go further and filter on app/status combinations

	let result: Array<IScenario> = [];
	let scenarios = 0;

	// iterate all permutations of the X and Y axis
	for (const pX of permutations(axisX.values)) {
		for (const pY of permutations(axisY.values)) {
			let affinity = 0;
			scenarios++;

			// test each application individually
			for (const application of appsToTest) {
				for (const status of distinct(select(application.uses, a => a.status))) {
					// create a two dimensional array of boolean values where the application exists in this scenario
					const matrix = toArray(select(pX, x => toArray(select(pY, y => exists(where(application.uses, use => use.status === status && use[axisX.dimension] === x && use[axisY.dimension] === y))))));

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
	console.log(`Returning ${result.length} scenarios with affinity score of ${result.length === 0 ? 0 : result[0].affinity}`)

	return result;
}

// TODO: implement fixX and fixY versions of bruteForce - perms of non-fixed dimension only


export class Cell {
	constructor(public readonly name: string, public readonly status: string, public colspan: number = 1, public rowspan: number = 1 ) { }
}

export function prepare(applications: Array<IApplication>, scenario: IScenario): Array<Array<Array<Cell>>> {
	const start = new Date().getTime();

	// denormalise the underlying application data
	const flattened = toArray(selectMany(applications, a => a.uses, (a, u) => { return { name: a.name, capability: u.capability, product: u.product, location: u.location, status: u.status }; }));

	// build the result table, 3D array: rows, columns, and 0..n apps, including the x and y axis
	const xAxis = [[new Cell("", "xAxis")], ...select(scenario.xAxis.values, x => [new Cell(x, "xAxis")])];
	const result = [xAxis, ...select(scenario.yAxis.values, y => [[new Cell(y, "yAxis")], ...select(scenario.xAxis.values, x => toArray(select(where(flattened, a => a[scenario.xAxis.dimension] === x && a[scenario.yAxis.dimension] === y), a => new Cell(a.name, a.status))))])];

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
