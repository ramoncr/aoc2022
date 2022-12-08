import { readFileSync } from 'fs';
import { calculateSideScore, TreeWithScore } from './utils';

let fileContents = readFileSync("./input.txt", { encoding: "utf-8" });
const grid = fileContents.split(/\r?\n/)
    .map(value => value.split("")
        .map(val => Number(val)));
const turnedGrid = grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
const treesWithScenicScore: TreeWithScore[] = [];

let visibleTreesCount = (grid.length * 2) + (turnedGrid.length * 2) - 4;

for (let ri = 1; ri < (grid.length - 1); ri++) {
    const row = grid[ri];

    for (let ci = 1; ci < (row.length - 1); ci++) {
        const tree = row[ci];
        const column = turnedGrid[ci];

        const treesLeft = row.slice(0, ci);
        const treesRight = row.slice(ci + 1, grid.length);
        const treesTop = column.slice(0, ri);
        const treesBottom = column.slice(ri + 1, grid.length);

        // Part 1: check if tree is visible and count if yes
        if (treesLeft.every(ct => ct < tree) 
            || treesRight.every(ct => ct < tree) 
            || treesTop.every(ct => ct < tree) 
            || treesBottom.every(ct => ct < tree))
                visibleTreesCount++;

        // Part 2: calculate scenic score
        const treeWithScore: TreeWithScore = { coordinates: [ci, ri], height: tree, scenicScore: 0 };

        const left = calculateSideScore(treesLeft, tree, true);
        const right = calculateSideScore(treesRight, tree);
        const top = calculateSideScore(treesTop, tree, true);
        const bottom = calculateSideScore(treesBottom, tree);

        treeWithScore.scenicScore = left * right * top * bottom;
        treesWithScenicScore.push(treeWithScore);
    }
}

console.log("Visble tree's: " + visibleTreesCount);
console.log("Highest scenic score: " + Math.max(...treesWithScenicScore.map(val => val.scenicScore)));