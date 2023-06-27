// knight movement functions
const makeKnight = (x, y) => {
    const possibleMoves = {
        m1: function () {
            let newX = x + 1 > 7 || x + 1 < 0 ? null : x + 1;
            let newY = y + 2 > 7 || y + 2 < 0 ? null : y + 2;
            return [newX, newY];
        },
        m2: function () {
            let newX = x + 2 > 7 || x + 2 < 0 ? null : x + 2;
            let newY = y + 1 > 7 || y + 1 < 0 ? null : y + 1;
            return [newX, newY];
        },
        m3: function () {
            let newX = x + 2 > 7 || x + 2 < 0 ? null : x + 2;
            let newY = y - 1 > 7 || y - 1 < 0 ? null : y - 1;
            return [newX, newY];
        },
        m4: function () {
            let newX = x + 1 > 7 || x + 1 < 0 ? null : x + 1;
            let newY = y - 2 > 7 || y - 2 < 0 ? null : y - 2;
            return [newX, newY];
        },
        m5: function () {
            let newX = x - 1 > 7 || x - 1 < 0 ? null : x - 1;
            let newY = y - 2 > 7 || y - 2 < 0 ? null : y - 2;
            return [newX, newY];
        },
        m6: function () {
            let newX = x - 2 > 7 || x - 2 < 0 ? null : x - 2;
            let newY = y - 1 > 7 || y - 1 < 0 ? null : y - 1;
            return [newX, newY];
        },
        m7: function () {
            let newX = x - 2 > 7 || x - 2 < 0 ? null : x - 2;
            let newY = y + 1 > 7 || y + 1 < 0 ? null : y + 1;
            return [newX, newY];
        },
        m8: function () {
            let newX = x - 1 > 7 || x - 1 < 0 ? null : x - 1;
            let newY = y - 2 > 7 || y - 2 < 0 ? null : y - 2;
            return [newX, newY];
        },
    }
    return { x, y, possibleMoves };
}

//node factory
const makeNode = (parent, x, y) => {
    if (x === null || y === null) return null;
    return { parent, x, y };
}

//build node tree and return shortest path
const knightMoves = (start, finish) => {
    if (start[0] < 0 || start[0] > 7 || start[1] < 0 || start[1] > 7 || finish[0] < 0 || finish[0] > 7 || finish[1] < 0 || finish[1] > 7) {
        return "Your start or finish coordinates are off the board. Please choose coordinates between 0 and 7."
    }
    let queue = [];
    queue.push(makeNode(null, start[0], start[1]));
    let visitedSquares = [[start[0], start[1]]];
    // loop until path returned
    while (true) {
        let currentNode = queue.shift();
        // if target square reached
        if (currentNode.x === finish[0] && currentNode.y === finish[1]) {
            let distance = 0;
            let path = ` [${currentNode.x}, ${currentNode.y}]`;
            while (currentNode.parent !== null) {
                currentNode = currentNode.parent;
                path = ` [${currentNode.x}, ${currentNode.y}] ->` + path;
                distance++;
            }
            return `You made it in ${distance} moves! Here's your path:` + path;
        }
        // otherwise implement moves and add to tree
        let tempKnight = makeKnight(currentNode.x, currentNode.y);
        for (let move in tempKnight.possibleMoves) {
            let newCoordinates = tempKnight.possibleMoves[move]();
            // create node for each possible move (pointing to parent)
            let newNode = makeNode(currentNode, newCoordinates[0], newCoordinates[1]);
            // if square is on board (node not null) and not already visited, push node to queue
            if (newNode && !JSON.stringify(visitedSquares).includes(JSON.stringify(newCoordinates))) {
                queue.push(newNode);
                // save coordinates to prevent future duplication
                visitedSquares.push(newCoordinates);
            }
        }
    }
}