// node factory
const createNode = (data, left, right) => {
    return { data, left, right };
}

// tree factory
const createTree = array => {

    // sort array
    const sorted = sort(array);
    // remove duplicates
    sorted.forEach((element, index) => {
        if (sorted[index] === sorted[index + 1]) sorted.splice(index, 1);
    });
    // generate tree
    let root = _buildTree(sorted);

    function _buildTree(array) {

        if (array.length == 0) return null;
        if (array.length == 1) return createNode(array[0], null, null);

        let mid = Math.floor(array.length / 2);
        let data = array[mid];
        let left = array.slice(0, mid);
        let right = array.slice(mid + 1);
        return createNode(data, _buildTree(left), _buildTree(right));
    }

    function insert(value) {
        const newNode = createNode(value, null, null);
        let parent;
        let pos = this.root;
        // traverse tree 
        while (pos) {
            // if value is found, make no insertions
            if (value == pos.data) return;
            // move left
            if (value < pos.data) {
                parent = pos;
                pos = pos.left;
            }
            // move right
            else if (value > pos.data) {
                parent = pos;
                pos = pos.right;
            }
        }
        // once traversal complete, add node to current position
        if (value < parent.data) parent.left = newNode;
        else if (value > parent.data) parent.right = newNode;
    }
    

    function remove(value) { // some cases still problematic
        let parent = null;
        let pos = this.root;
        // traverse tree
        while (pos.data != value) {
            parent = pos;
            if (value < pos.data) pos = pos.left;
            else if (value > pos.data) pos = pos.right;
            // if traversal is complete and value not found, return
            if (!pos) return;
        }
        // if value is found
        // if node has no children, remove it
        if (!pos.left && !pos.right) {
            if (value < parent.data) parent.left = null;
            else if (value > parent.data) parent.right = null;
        }
        // if node has no left child, point parent to its right child
        else if (!pos.left) {
            // if root node
            if (!parent) this.root = pos.right;
            // left case
            else if (value < parent.data) parent.left = pos.right;
            // right case
            else if (value > parent.data) parent.right = pos.right;
        }
        // if node has no right child, point parent to its left child
        else if (!pos.right) {
            // if root node
            if (!parent) this.root = pos.left;
            // left case
            else if (value < parent.data) parent.left = pos.left;
            // right case
            else if (value > parent.data) parent.right = pos.left;
        }
        // if node has two children (tricky case)
        else {
            // find inorder successor
            parent = null; // to catch if there is no left traversal (parent in relation to temp, not pos)
            let temp = pos.right;
            while (temp.left) {
                parent = temp;
                temp = temp.left;
            }
            // copy inorder successor to node
            pos.data = temp.data;
            // delete inorder successor
            if (parent) parent.left = temp.right
            else pos.right = temp.right; // if no left traversal
        }
    }
    

    function find(value) {
        if (typeof value != "number") return "Value not found."
        let pos = this.root;
        while (pos && pos.data != value) {
            if (value < pos.data) pos = pos.left;
            else if (value > pos.data) pos = pos.right;
        }
        return pos ? pos : "Value not found."
    }
    

    function levelOrder(cb) {
        let queue = [];
        let catchArray = [];
        let pos;
        queue.push(this.root);
        while (queue.length > 0) {
            pos = queue.shift();
            try {
                cb(pos);
            } catch {
                catchArray.push(pos.data);
            }
            if (pos.left) queue.push(pos.left);
            if (pos.right) queue.push(pos.right);
        }
        if (catchArray.length > 0) return catchArray;
    }
    

    function inorder(cb) { //LDR
        let catchArray = [];
        function traverse(pos) {
            if (!pos) return;
            if (pos.left) traverse(pos.left);
            try {
                cb(pos);
            } catch {
                catchArray.push(pos.data);
            }
            if (pos.right) traverse(pos.right);
        }
        traverse(this.root);
        if (catchArray.length > 0) return catchArray;
    }
    

    function preorder(cb) { //DLR
        let catchArray = [];
        function traverse(pos) {
            if (!pos) return;
            try {
                cb(pos);
            } catch {
                catchArray.push(pos.data);
            }
            if (pos.left) traverse(pos.left);
            if (pos.right) traverse(pos.right);
        }
        traverse(this.root);
        if (catchArray.length > 0) return catchArray;
    }
    

    function postorder(cb) { //LRD
        let catchArray = [];
        function traverse(pos) {
            if (!pos) return;
            if (pos.left) traverse(pos.left);
            if (pos.right) traverse(pos.right);
            try {
                cb(pos);
            } catch {
                catchArray.push(pos.data);
            }
        }
        traverse(this.root);
        if (catchArray.length > 0) return catchArray;
    }
    

    function depth(node) { // use with find()
        if (typeof node == "string") return "Node not found."; //catch negative result from find()
        let d = 0;
        let pos = this.root;
        while (pos && pos != node) {
            if (pos.data < node.data) pos = pos.right;
            else if (pos.data > node.data) pos = pos.left;
            d++;
        }
        return d;
    }


    function treeHeight(from) {
        const max = (a, b) => {
            if (a > b) return a;
            else return b;
        }
        function traverse(pos) {
            if (!pos) return 0;
            return max(1 + traverse(pos.left), 1 + traverse(pos.right));
        }
        return traverse(from);
    }
    

    function height(node) { // use with find()
        if (typeof node == "string") return "Node not found."; //catch negative result from find()
        const depth = this.depth(node);
        const treeHeight = this.treeHeight(this.root);
        return treeHeight - 1 - depth;
    }
    

    function isBalanced() {
        function traverse(pos) {
            if (!pos) return true;
            let left = treeHeight(pos.left);
            let right = treeHeight(pos.right);
            let difference = Math.abs(left - right);
            return (difference <= 1) && traverse(pos.left) && traverse(pos.right);
        }
        return traverse(this.root);
    }
    

    function rebalance() {
        let newArray = this.inorder();
        let newRoot = _buildTree(sort(newArray));
        this.root = newRoot;
    }
    

    return {
        root,
        insert,
        remove,
        find,
        levelOrder,
        inorder,
        preorder,
        postorder,
        depth,
        treeHeight,
        height,
        isBalanced,
        rebalance
    };
}


// example trees for testing
let tree = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
let fir = createTree([8, 4, 11, 7, 3, 15, 9]);
let test = createTree([827, 1, 9, 8, 8, 2, 928, 82, 53, 1, 782, 52, 92, 593]);

// callback for testing traversal methods
function logData(x) {
    console.log(x.data);
}

// supporting functions
// mergesort
function sort(array) {
    if (left(array).length <= 1 && right(array).length <= 1) {
    return merge(left(array), right(array));
    }
    return merge(sort(left(array)), sort(right(array)));
}

function merge(array1, array2) {
    let newArray = [];
    while (array1.length > 0 || array2.length > 0) {
        let smallest = (array1.length == 0)
        ? array2.shift() 
        : (array2.length == 0)
        ? array1.shift()
        : (array1[0] < array2[0]) 
        ? array1.shift() 
        : array2.shift();
        newArray.push(smallest);
    }
    return newArray;
}

function left(array) {
    let half = Math.ceil(array.length / 2);
    return array.slice(0, half);
}

function right(array) {
    let half = Math.ceil(array.length / 2);
    return array.slice(half, array.length);
}

// print tree
const print = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        print(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        print(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
