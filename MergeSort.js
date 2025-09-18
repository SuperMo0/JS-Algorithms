function split(array, l, r) {
    if (l < r) {
        let mid = (l + r) / 2;
        mid = Math.floor(mid);
        split(array, l, mid);
        split(array, mid + 1, r);
        merge(array, l, mid, r);
    }
}

function merge(array, l, mid, r) {
    let array1 = array.slice(l, mid + 1);
    let array2 = array.slice(mid + 1, r + 1);
    let it1 = 0; let it2 = 0; let it0 = l;
    while (it1 < array1.length || it2 < array2.lenght) {
        if (it2 >= array2.length || (it1 < array1.length && array1[it1] <= array2[it2])) {
            array[it0] = array1[it1];
            it1++;
        }
        else {
            array[it0] = array2[it2];
            it2++;
        }
        it0++;
    }
}

let array = [];
let array2 = [];
for (let i = 0; i < 10000000; i++) {
    array2.push(Math.random() * 10000000);
}
array1 = array2.slice(0, array2.length);


let time = new Date().getTime();
split(array2, 0, array2.length - 1);
console.log("Merge sort time in Ms: " + String(new Date().getTime() - time));

time = new Date().getTime();
array1.sort((a, b) => { return a - b });

console.log("sort time in Ms: " + String(new Date().getTime() - time));






