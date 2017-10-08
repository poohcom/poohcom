
//import * as util from './Util';
//interface Dictionary<K, V> {
//    clear(): void;
//    delete(key: K): boolean;
//    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
//    get(key: K): V | undefined;
//    has(key: K): boolean;
//    set(key: K, value: V): this;
//    readonly size: number;
//}

// Used internally by dictionary

const _hasOwnProperty = Object.prototype.hasOwnProperty;
const has = function (obj: any, prop: any) {
    return _hasOwnProperty.call(obj, prop);
};

/**
* Function signature for comparing
* <0 means a is smaller
* = 0 means they are equal
* >0 means a is larger
*/
interface ICompareFunction<T> {
    (a: T, b: T): number;
}

/**
* Function signature for checking equality
*/
interface IEqualsFunction<T> {
    (a: T, b: T): boolean;
}

/**
* Function signature for Iterations. Return false to break from loop
*/
interface ILoopFunction<T> {
    (a: T): boolean | void;
}

/**
 * Default function to compare element order.
 * @function
 */
function defaultCompare<T>(a: T, b: T): number {
    if (a < b) {
        return -1;
    } else if (a === b) {
        return 0;
    } else {
        return 1;
    }
}

/**
 * Default function to test equality.
 * @function
 */
function defaultEquals<T>(a: T, b: T): boolean {
    return a === b;
}

/**
 * Default function to convert an object to a string.
 * @function
 */
function defaultToString(item: any): string {
    if (item === null) {
        return 'COLLECTION_NULL';
    } else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    } else if (isString(item)) {
        return '$s' + item;
    } else {
        return '$o' + item.toString();
    }
}

/**
* Joins all the properies of the object using the provided join string
*/
/*
function makeString<T>(item: T, join: string = ','): string {
    if (item === null) {
        return 'COLLECTION_NULL';
    } else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    } else if (isString(item)) {
        return item.toString();
    } else {
        let toret = '{';
        let first = true;
        for (const prop in item) {
            if (has(item, prop)) {
                if (first) {
                    first = false;
                } else {
                    toret = toret + join;
                }
                toret = toret + prop + ':' + (<any>item)[prop];
            }
        }
        return toret + '}';
    }
}
*/
/**
 * Checks if the given argument is a function.
 * @function
 */
function isFunction(func: any): boolean {
    return (typeof func) === 'function';
}

/**
 * Checks if the given argument is undefined.
 * @function
 */
function isUndefined(obj: any): boolean {
    return (typeof obj) === 'undefined';
}

/**
 * Checks if the given argument is a string.
 * @function
 */
function isString(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object String]';
}

/**
 * Reverses a compare function.
 * @function
 */
function reverseCompareFunction<T>(compareFunction: ICompareFunction<T>): ICompareFunction<T> {
    if (!isFunction(compareFunction)) {
        return function (a, b) {
            if (a < b) {
                return 1;
            } else if (a === b) {
                return 0;
            } else {
                return -1;
            }
        };
    } else {
        return function (d: T, v: T) {
            return compareFunction(d, v) * -1;
        };
    }
}

/**
 * Returns an equal function given a compare function.
 * @function
 */
function compareToEquals<T>(compareFunction: ICompareFunction<T>): IEqualsFunction<T> {
    return function (a: T, b: T) {
        return compareFunction(a, b) === 0;
    };
}

interface IDictionaryPair<K, V> {
    key: K;
    value: V;
}


//export default class Dictionary< K, V > {
class Dictionary<K, V> {

    /**
     * Object holding the key-value pairs.
     * @type {Object}
     * @private
     */
    protected table: { [key: string]: IDictionaryPair<K, V> };
    //: [key: K] will not work since indices can only by strings in javascript and typescript enforces this.

    /**
     * Number of elements in the list.
     * @type {number}
     * @private
     */
    protected nElements: number;

    /**
     * Function used to convert keys to strings.
     * @type {function(Object):string}
     * @protected
     */
    protected toStr: (key: K) => string;


    /**
     * Creates an empty dictionary.
     * @class <p>Dictionaries map keys to values; each key can map to at most one value.
     * This implementation accepts any kind of objects as keys.</p>
     *
     * <p>If the keys are custom objects a function which converts keys to unique
     * strings must be provided. Example:</p>
     * <pre>
     * function petToString(pet) {
     *  return pet.name;
     * }
     * </pre>
     * @constructor
     * @param {function(Object):string=} toStrFunction optional function used
     * to convert keys to strings. If the keys aren't strings or if toString()
     * is not appropriate, a custom function which receives a key and returns a
     * unique string must be provided.
     */
    //constructor(toStrFunction?: (key: K) => string) {
    //    this.table = {};
    //    this.nElements = 0;
    //    //this.toStr = toStrFunction || util.defaultToString;
    //    this.toStr = toStrFunction || defaultToString;
    //}

    constructor() {
        this.table = {};
        this.nElements = 0;
        
        this.toStr =  defaultToString;
    }

    /**
     * Returns the value to which this dictionary maps the specified key.
     * Returns undefined if this dictionary contains no mapping for this key.
     * @param {Object} key key whose associated value is to be returned.
     * @return {*} the value to which this dictionary maps the specified key or
     * undefined if the map contains no mapping for this key.
     */
    //getValue(key: K): V {
    //    const pair: IDictionaryPair<K, V> = this.table['$' + this.toStr(key)];
    //    if (util.isUndefined(pair)) {
    //        return undefined;
    //    }
    //    return pair.value;
    //}
        get(key: K): V {
        const pair: IDictionaryPair<K, V> = this.table['$' + this.toStr(key)];
        ///if (util.isUndefined(pair)) {
        if (isUndefined(pair)) {
            return undefined;
        }
        return pair.value;
    }

    /**
     * Associates the specified value with the specified key in this dictionary.
     * If the dictionary previously contained a mapping for this key, the old
     * value is replaced by the specified value.
     * @param {Object} key key with which the specified value is to be
     * associated.
     * @param {Object} value value to be associated with the specified key.
     * @return {*} previous value associated with the specified key, or undefined if
     * there was no mapping for the key or if the key/value are undefined.
     */
    set(key: K, value: V): V {

        //if (util.isUndefined(key) || util.isUndefined(value)) {
        if (isUndefined(key) || isUndefined(value)) {
            return undefined;
        }

        let ret: V;
        const k = '$' + this.toStr(key);
        const previousElement: IDictionaryPair<K, V> = this.table[k];
        //if (util.isUndefined(previousElement)) {
        if (isUndefined(previousElement)) {
            this.nElements++;
            ret = undefined;
        } else {
            ret = previousElement.value;
        }
        this.table[k] = {
            key: key,
            value: value
        };
        return ret;
    }

    /**
     * Removes the mapping for this key from this dictionary if it is present.
     * @param {Object} key key whose mapping is to be removed from the
     * dictionary.
     * @return {*} previous value associated with specified key, or undefined if
     * there was no mapping for key.
     */
    remove(key: K): V {
        const k = '$' + this.toStr(key);
        const previousElement: IDictionaryPair<K, V> = this.table[k];
        //if (!util.isUndefined(previousElement)) {
        if (!isUndefined(previousElement)) {
            delete this.table[k];
            this.nElements--;
            return previousElement.value;
        }
        return undefined;
    }

    delete(key: K): V {
        const k = '$' + this.toStr(key);
        const previousElement: IDictionaryPair<K, V> = this.table[k];
        //if (!util.isUndefined(previousElement)) {
        if (!isUndefined(previousElement)) {
            delete this.table[k];
            this.nElements--;
            return previousElement.value;
        }
        return undefined;
    }


    /**
     * Returns an array containing all of the keys in this dictionary.
     * @return {Array} an array containing all of the keys in this dictionary.
     */
    keys(): K[] {
        const array: K[] = [];
        for (const name in this.table) {
            //if (util.has(this.table, name)) {
            if (has(this.table, name)) {
                const pair: IDictionaryPair<K, V> = this.table[name];
                array.push(pair.key);
            }
        }
        return array;
    }

    /**
     * Returns an array containing all of the values in this dictionary.
     * @return {Array} an array containing all of the values in this dictionary.
     */
    values(): V[] {
        const array: V[] = [];
        for (const name in this.table) {
            //if (util.has(this.table, name)) {
            if (has(this.table, name)) {
                const pair: IDictionaryPair<K, V> = this.table[name];
                array.push(pair.value);
            }
        }
        return array;
    }

    /**
    * Executes the provided function once for each key-value pair
    * present in this dictionary.
    * @param {function(Object,Object):*} callback function to execute, it is
    * invoked with two arguments: key and value. To break the iteration you can
    * optionally return false.
    */
    forEach(callback: (key: K, value: V) => any): void {
        for (const name in this.table) {
            //if (util.has(this.table, name)) {
            if (has(this.table, name)) {
                const pair: IDictionaryPair<K, V> = this.table[name];
                const ret = callback(pair.key, pair.value);
                if (ret === false) {
                    return;
                }
            }
        }
    }

    /**
     * Returns true if this dictionary contains a mapping for the specified key.
     * @param {Object} key key whose presence in this dictionary is to be
     * tested.
     * @return {boolean} true if this dictionary contains a mapping for the
     * specified key.
     */
    containsKey(key: K): boolean {
        //return !util.isUndefined(this.get(key));
        return !isUndefined(this.get(key));
    }

    has(key: K): boolean {
        //return !util.isUndefined(this.get(key));
        return !isUndefined(this.get(key));
    }

    /**
    * Removes all mappings from this dictionary.
    * @this {collections.Dictionary}
    */
    clear() {
        this.table = {};
        this.nElements = 0;
    }

    /**
     * Returns the number of keys in this dictionary.
     * @return {number} the number of key-value mappings in this dictionary.
     */
    size(): number {
        return this.nElements;
    }

    /**
     * Returns true if this dictionary contains no mappings.
     * @return {boolean} true if this dictionary contains no mappings.
     */
    isEmpty(): boolean {
        return this.nElements <= 0;
    }

    toString(): string {
        let toret = '{';
        this.forEach((k, v) => {
            toret += `\n\t${k} : ${v}`;
        });
        return toret + '\n}';
    }
} // End of dictionary