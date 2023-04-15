// returns first n values of fibonacci sequence, iterative

function fibs(n) {
    if (n <= 0) return "Please enter a positive non-zero integer."
    let a = [0, 1];
    if (n == 1) return [0];
    if (n == 2) return a;
    while (a.length < n) {
        a.push(a[a.length - 1] + a[a.length - 2]);
    }
    return a;
}

// returns first n values of fibonacci sequence, recursive

function fibsRec(n) {
    if (n <= 0) return "Please enter a positive non-zero integer."
    if (n == 1) return [0];
    if (n == 2) return [0, 1];
    return [...fibsRec(n - 1), fibsRec(n - 1)[n - 2] + fibsRec(n - 1)[n - 3]];
}