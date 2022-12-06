import { readFileSync } from 'fs';

const fileContents = readFileSync("./rucksacks.txt", { encoding: "utf-8" });
const rucksacks = fileContents.split(/\r?\n/);

const letters: string[] = [];
let totalScore = 0;

for (let i = 0; i < rucksacks.length / 3; i++) {
    let startingPostition = i * 3;

    const firstRucksack = rucksacks[startingPostition];
    for (const char of firstRucksack) {
        if(rucksacks[startingPostition+1].indexOf(char) != -1 && rucksacks[startingPostition+2].indexOf(char) != -1) {
            letters.push(char);
            let charCode = char.charCodeAt(0) - 96;

            if(char === char.toUpperCase()) {
                // uppercase
                charCode += 58;
            }

            console.log(`Group ${i}, has character ${char} with a score of ${charCode}`);

            totalScore += charCode;
            break;
        }
    }
}

// console.log("code: " + ("Z".charCodeAt(0) - 96 + 58));


console.log(`A total score of: ${totalScore}`);

