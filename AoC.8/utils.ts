export type TreeWithScore = { coordinates: [ci: number, ri: number], height: number, scenicScore: number };

export function calculateSideScore(sideTrees: number[], treeValue: number, reverse = false): number {
    let count = 0;

    if(reverse) {
        sideTrees = sideTrees.reverse();
    }

    for (const sideTree of sideTrees) {
        count++;
        if(sideTree >= treeValue) return count;
    }

    return count;
}