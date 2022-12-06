import { readFileSync } from 'fs';

const fileContents = readFileSync("./cleaningsections.txt", { encoding: "utf-8" });
const pairs = fileContents.split(/\r?\n/);

let counter = 0;
let partialOverlap = 0;

for (const pair of pairs) {
    const sections = pair.split(",");

    const section1 = sections[0].split("-").map(val => Number(val));
    const section2 = sections[1].split("-").map(val => Number(val));

    const [min1, max1] = section1;
    const [min2, max2] = section2;

    if ((min1 <= min2 && max1 >= max2) || (min2 <= min1 && max2 >= max1)) counter++;

    const s1 = buildArray(min1, max1);
    const s2 = buildArray(min2, max2);

    function buildArray(min: number, max: number): Number[] {
        const array: Number[] = [];
        for (let i = 0; i <= max - min; i++) {
            array.push(min + i);
        }
        return array;
    }

    const filteredArray = s1.filter(value => s2.includes(value));
    if (filteredArray.length > 0) partialOverlap++;

}

console.log(`A total of ${counter} completely overlap.`);
console.log(`A total of ${partialOverlap} partially overlap.`);

