import { cloneDeep, head, uniqWith } from "lodash";
import { readInputAsArray } from "../shared/utils";
import { Position } from "./classes";

const commands = readInputAsArray();

const headPosition: Position = { x: 0, y: 0 };
const tailPosition: Position = { x: 0, y: 0 };

const allPositions: Position[] = [];

const directions: Map<string, string> = new Map();
directions.set("L", "horiztonal");
directions.set("R", "horiztonal");
directions.set("U", "vertical");
directions.set("D", "vertical");

let previousDirection: string | undefined = undefined;

for (const command of commands) {
    const [direction, rawSteps] = command.split(" ");
    const steps = Number(rawSteps);
    // Determine if we are going straight
    const cornering: boolean = !!previousDirection && directions.get(direction) !== directions.get(previousDirection);
    const passingItSelf: boolean = !!previousDirection && !cornering && direction != previousDirection;

    // console.log(`== ${command} ==`)

    for (let i = 0; i < steps; i++) {
        if (direction === "R")
            moveRight(i, cornering, passingItSelf);
        if (direction === "L")
            moveLeft(i, cornering, passingItSelf);
        if (direction === "U")
            moveUp(i, cornering, passingItSelf);
        if (direction === "D")
            moveDown(i, cornering, passingItSelf);

        allPositions.push(cloneDeep(tailPosition));
        // drawPosition(headPosition, tailPosition);
        // console.log(`Head: ${headPosition.x},${headPosition.y}; Tail: ${tailPosition.x},${tailPosition.y}`)
    }


    previousDirection = direction;
}

const uniquePositions = uniqWith(allPositions, (a: Position, b: Position) => a.x === b.x && a.y === b.y);f

console.log("Number of positions: " + uniquePositions.length);


function moveRight(i: number, cornering: boolean, passingItSelf: boolean) {
    headPosition.x++;
    if (i === 0 && (passingItSelf || cornering)) return;
    if (i === 1 && cornering && (tailPosition.y === headPosition.y|| tailPosition.x === headPosition.x-1)) return;
    if (i > 0 && cornering && (tailPosition.y != headPosition.y && tailPosition.x != headPosition.x)) tailPosition.y = headPosition.y;
    tailPosition.x = headPosition.x - 1;
}

function moveLeft(i: number, cornering: boolean, passingItSelf: boolean) {
    headPosition.x--;
    if (i === 0 && (passingItSelf || cornering)) return;
    if (i === 1 && cornering && (tailPosition.y === headPosition.y|| tailPosition.x === headPosition.x+1)) return;
    if (i > 0 && cornering && (tailPosition.y != headPosition.y && tailPosition.x != headPosition.x)) tailPosition.y = headPosition.y;
    tailPosition.x = headPosition.x + 1;
}

function moveUp(i: number, cornering: boolean, passingItSelf: boolean) {
    headPosition.y++;
    if (i === 0 && (passingItSelf || cornering)) return;
    if (i === 1 && cornering && (tailPosition.y === headPosition.y-1|| tailPosition.x === headPosition.x)) return;
    if (i > 0 && cornering && (tailPosition.y != headPosition.y && tailPosition.x != headPosition.x)) tailPosition.x = headPosition.x;
    tailPosition.y = headPosition.y - 1;
}

function moveDown(i: number, cornering: boolean, passingItSelf: boolean) {
    headPosition.y--;
    if (i === 0 && (passingItSelf || cornering)) return;
    if (i === 1 && cornering && (tailPosition.y === headPosition.y+1|| tailPosition.x === headPosition.x)) return;
    if (i > 0 && cornering && (tailPosition.y != headPosition.y && tailPosition.x != headPosition.x)) tailPosition.x = headPosition.x;
    tailPosition.y = headPosition.y + 1;
}



function drawPosition(head: Position, tail: Position) {
    const gridSize = 10;

    for (let i = 0; i < gridSize; i++) {
        const row = gridSize - i -1 ;
        let rowPrint = "";

        for (let x = 0; x < gridSize; x++) {
            const col = x;

            if(row === head.y && head.x === col) {
                rowPrint += "H"
            } else if(row === tail.y && tail.x === col) {
                rowPrint += "T"
            } else {
                rowPrint += "."
            }
        }

        console.log(rowPrint);
    }
}