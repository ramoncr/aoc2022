import { readFileSync } from 'fs';

let fileContents = readFileSync("./startingpositions.txt", { encoding: "utf-8" });
const stacks = fileContents.split(/\r?\n/).map(value => value.split(" "));

fileContents = readFileSync("./moveinstructions.txt", { encoding: "utf-8" });
const instructions = fileContents.split(/\r?\n/);

for (const instruction of instructions) {
    const numbers = instruction.split(" ").map(value => Number(value)).filter(value => !isNaN(value));
    const [count, source, target] = numbers; 
    for (let i = 0; i < count; i++) {
        stacks[target-1].push(stacks[source-1].pop() ?? '');
    }
}

let topicContainers = "";
for(const stack of stacks) {
    topicContainers += stack[stack.length -1]
}

console.log(topicContainers);

