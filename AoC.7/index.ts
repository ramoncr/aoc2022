import { readFileSync } from 'fs';
import { File, Folder } from './classes';
import { calculateFolderSizes, printTree } from './util';

let fileContents = readFileSync("./input.txt", { encoding: "utf-8" });
const terminalOutput = fileContents.split(/\r?\n/);

const baseFolder = new Folder("/", undefined);

let currentFolder: Folder | undefined = baseFolder;
const allFolders: Folder[] = [];

for (const output of terminalOutput) {
    const segments = output.split(" ");
    if (output.indexOf("$") >= 0) {
        if (segments.length === 2) {
            // ls command
        } else if (segments.length === 3) {
            // cd command
            if (segments[2] === "..") {
                currentFolder = currentFolder?.parent;
            } else {
                const newFolder = new Folder(segments[2], currentFolder);
                currentFolder?.folders.push(newFolder);
                allFolders.push(newFolder);
                currentFolder = newFolder;
            }

        }
    } else {
        // file or dir listing
        const [fileSize, fileName] = segments;

        if (fileSize !== "dir")
            currentFolder?.files.push(new File(fileName, Number(fileSize), currentFolder));
    }
}

const sizeBelowThreshold = calculateFolderSizes(baseFolder);

printTree(baseFolder);

console.log("Sum: " + sizeBelowThreshold.reduce((partialSum, a) => partialSum + a, 0))

// Determine folder sizes
    const neededSpace = 30000000 - (70000000 - baseFolder.size);

    const foldersWithEnoughSpace = allFolders.filter(folder => folder?.size >= neededSpace).map(val => val.size).sort((a) => a);

    console.log("Needed space: " + neededSpace);
    console.log("Best folder to delete: " + foldersWithEnoughSpace[foldersWithEnoughSpace.length - 1]);
