// knight movement functions
const makeKnight = (x, y) => {
    const possibleMoves = {
        m1: function () {
            let newX = x + 1;
            let newY = y + 2;
            if (newX > 7 || newX < 0) newX = null;
            if (newY > 7 || newY < 0) newY = null;
            return [newX, newY];
        },

        m2: function () {
            let newX = x + 2;
            let newY = y + 1;
            if (newX > 7 || newX < 0) newX = null;
            if (newY > 7 || newY < 0) newY = null;
            return [newX, newY];
        },

        m3: function () {
            let newX = x + 2;
            let newY = y - 1;
            if (newX > 7 || newX < 0) newX = null;
            if (newY > 7 || newY < 0) newY = null;
            return [newX, newY];
        },

        m4: function () {
            let newX = x + 1;
            let newY = y - 2;
            if (newX > 7 || newX < 0) newX = null;
            if (newY > 7 || newY < 0) newY = null;
            return [newX, newY];
        },

        m5: function () {
            let newX = x - 1;
            let newY = y - 2;
            if (newX > 7 || newX < 0) newX = null;
            if (newY > 7 || newY < 0) newY = null;
            return [newX, newY];
        },

        m6: function () {
            let newX = x - 2;
            let newY = y - 1;
            if (newX > 7 || newX < 0) newX = null;
            if (newY > 7 || newY < 0) newY = null;
            return [newX, newY];
        },

        m7: function () {
            let newX = x - 2;
            let newY = y + 1;
            if (newX > 7 || newX < 0) newX = null;
            if (newY > 7 || newY < 0) newY = null;
            return [newX, newY];
        },

        m8: function () {
            let newX = x - 1;
            let newY = y - 2;
            if (newX > 7 || newX < 0) newX = null;
            if (newY > 7 || newY < 0) newY = null;
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