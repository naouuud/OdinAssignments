// mergesort, recursive 

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