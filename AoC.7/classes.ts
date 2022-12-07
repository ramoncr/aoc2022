export class Folder {
    name: string;
    parent: Folder | undefined;
    files: File[] = []
    folders: Folder[] = [];
    size: number = 0;

    constructor(name: string, parent: Folder | undefined) {
        this.name = name;
        this.parent = parent;
    }
}

export class File {
    name: string;
    size: number;
    parent: Folder;


    constructor(name: string, size: number,  parent: Folder) {
        this.name = name;
        this.size = size;
        this.parent = parent;

    }
}