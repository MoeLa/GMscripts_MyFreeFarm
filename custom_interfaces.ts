export class MyString extends String {  
    reverse: () => string;
    capitalize: () => string;
}

export class MyArray<T> extends Array<T> {  
    equals: (val: T[]) => boolean;
    contains: (val) => boolean;
    shuffle: () => void;
    swap: (v1, v2) => void;
}

export class MyObject extends Object {  
    equals: (val) => boolean;
    order: any[];
    sortObj: (sortfkt ,descending: boolean) => void;
    isEmpty: () => boolean;
    length: () => number;
    clone: () => any;
}