import { readFileSync } from 'fs';
import { exit } from 'process';

let fileContents = readFileSync("./input.txt", { encoding: "utf-8" });

const size = 14;
for (let i = size; i < fileContents.length; i++) {
    const chars = fileContents.slice(i - size, i).split("");
    if (chars.every(cc => chars.filter(c => c === cc).length === 1)) {
        console.log(i);
        exit(1);
    }
}