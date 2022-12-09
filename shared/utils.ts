import { readFileSync } from 'fs';


export function readInput(demo = false): string {
    return readFileSync(demo ? "./input.demo.txt" : "./input.txt", { encoding: "utf-8" });
}

export function readInputAsArray(demo = false): string[] {
    return readInput(demo).split(/\r?\n/);
}