import { Folder } from "./classes";

export function printTree(folder: Folder) {
    printFolder(folder, 0);
}

export function calculateFolderSizes(folder: Folder): number[] {
    const sizesBelowThreshold: number[] = [];
    const threshold = 100000;

    const baseSize = calFolderSize(folder, sizesBelowThreshold, threshold);
    folder.size = baseSize;

    return sizesBelowThreshold;
}

function calFolderSize(folder: Folder, sizesBelowThreshold: number[], threshold: number): number {
    let size = folder.files.map(file => file.size).reduce((partialSum, a) => partialSum + a, 0);

    for (const nestedFolder of folder.folders) {
        const nestedSize = calFolderSize(nestedFolder, sizesBelowThreshold, threshold);
        nestedFolder.size = nestedSize;
        size += nestedSize;

        if(nestedSize <= threshold) sizesBelowThreshold.push(nestedSize);
    }

    return size;
}

function printFolder(folder: Folder, depth: number) {
    let logprefix = "";

    for (let i = 0; i < depth; i++) {
        logprefix += " ";
    }

    console.log(logprefix + "- " + folder.name + " (dir, size=" + folder.size + ")");

    for (const nestedFolder of folder.folders) {
        printFolder(nestedFolder, depth + 1);
    }

    for (const file of folder.files) {
        console.log(logprefix + " - " + file.name + " (file, size=" + file.size + ")");
    }

}