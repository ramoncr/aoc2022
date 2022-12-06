import { readFileSync } from 'fs';
import { exit } from 'process';

let fileContents = readFileSync("./startingpositions.txt", { encoding: "utf-8" });
const stacks = fileContents.split(/\r?\n/).map(value => value.split(" "));

fileContents = readFileSync("./moveinstructions.txt", { encoding: "utf-8" });
const instructions = fileContents.split(/\r?\n/);

for (const instruction of instructions) {
    const numbers = instruction.split(" ").map(value => Number(value)).filter(value => !isNaN(value));
    const [count, source, target] = numbers; 

    const tempStorage = [];
    for (let i = 0; i < count; i++) {
        tempStorage.push(stacks[source-1].pop());
    }

    stacks[target-1].push(...tempStorage.reverse() as any);
}

let topicContainers = "";
for(const stack of stacks) {
    topicContainers += stack[stack.length -1]
}

console.log(topicContainers);

