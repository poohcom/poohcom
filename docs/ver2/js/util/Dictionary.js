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
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var has = function (obj, prop) {
    return _hasOwnProperty.call(obj, prop);
};
/**
 * Default function to compare element order.
 * @function
 */
function defaultCompare(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a === b) {
        return 0;
    }
    else {
        return 1;
    }
}
/**
 * Default function to test equality.
 * @function
 */
function defaultEquals(a, b) {
    return a === b;
}
/**
 * Default function to convert an object to a string.
 * @function
 */
function defaultToString(item) {
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return '$s' + item;
    }
    else {
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
function isFunction(func) {
    return (typeof func) === 'function';
}
/**
 * Checks if the given argument is undefined.
 * @function
 */
function isUndefined(obj) {
    return (typeof obj) === 'undefined';
}
/**
 * Checks if the given argument is a string.
 * @function
 */
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}
/**
 * Reverses a compare function.
 * @function
 */
function reverseCompareFunction(compareFunction) {
    if (!isFunction(compareFunction)) {
        return function (a, b) {
            if (a < b) {
                return 1;
            }
            else if (a === b) {
                return 0;
            }
            else {
                return -1;
            }
        };
    }
    else {
        return function (d, v) {
            return compareFunction(d, v) * -1;
        };
    }
}
/**
 * Returns an equal function given a compare function.
 * @function
 */
function compareToEquals(compareFunction) {
    return function (a, b) {
        return compareFunction(a, b) === 0;
    };
}
//export default class Dictionary< K, V > {
var Dictionary = (function () {
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
    function Dictionary() {
        this.table = {};
        this.nElements = 0;
        this.toStr = defaultToString;
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
    Dictionary.prototype.get = function (key) {
        var pair = this.table['$' + this.toStr(key)];
        ///if (util.isUndefined(pair)) {
        if (isUndefined(pair)) {
            return undefined;
        }
        return pair.value;
    };
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
    Dictionary.prototype.set = function (key, value) {
        //if (util.isUndefined(key) || util.isUndefined(value)) {
        if (isUndefined(key) || isUndefined(value)) {
            return undefined;
        }
        var ret;
        var k = '$' + this.toStr(key);
        var previousElement = this.table[k];
        //if (util.isUndefined(previousElement)) {
        if (isUndefined(previousElement)) {
            this.nElements++;
            ret = undefined;
        }
        else {
            ret = previousElement.value;
        }
        this.table[k] = {
            key: key,
            value: value
        };
        return ret;
    };
    /**
     * Removes the mapping for this key from this dictionary if it is present.
     * @param {Object} key key whose mapping is to be removed from the
     * dictionary.
     * @return {*} previous value associated with specified key, or undefined if
     * there was no mapping for key.
     */
    Dictionary.prototype.remove = function (key) {
        var k = '$' + this.toStr(key);
        var previousElement = this.table[k];
        //if (!util.isUndefined(previousElement)) {
        if (!isUndefined(previousElement)) {
            delete this.table[k];
            this.nElements--;
            return previousElement.value;
        }
        return undefined;
    };
    Dictionary.prototype.delete = function (key) {
        var k = '$' + this.toStr(key);
        var previousElement = this.table[k];
        //if (!util.isUndefined(previousElement)) {
        if (!isUndefined(previousElement)) {
            delete this.table[k];
            this.nElements--;
            return previousElement.value;
        }
        return undefined;
    };
    /**
     * Returns an array containing all of the keys in this dictionary.
     * @return {Array} an array containing all of the keys in this dictionary.
     */
    Dictionary.prototype.keys = function () {
        var array = [];
        for (var name_1 in this.table) {
            //if (util.has(this.table, name)) {
            if (has(this.table, name_1)) {
                var pair = this.table[name_1];
                array.push(pair.key);
            }
        }
        return array;
    };
    /**
     * Returns an array containing all of the values in this dictionary.
     * @return {Array} an array containing all of the values in this dictionary.
     */
    Dictionary.prototype.values = function () {
        var array = [];
        for (var name_2 in this.table) {
            //if (util.has(this.table, name)) {
            if (has(this.table, name_2)) {
                var pair = this.table[name_2];
                array.push(pair.value);
            }
        }
        return array;
    };
    /**
    * Executes the provided function once for each key-value pair
    * present in this dictionary.
    * @param {function(Object,Object):*} callback function to execute, it is
    * invoked with two arguments: key and value. To break the iteration you can
    * optionally return false.
    */
    Dictionary.prototype.forEach = function (callback) {
        for (var name_3 in this.table) {
            //if (util.has(this.table, name)) {
            if (has(this.table, name_3)) {
                var pair = this.table[name_3];
                var ret = callback(pair.key, pair.value);
                if (ret === false) {
                    return;
                }
            }
        }
    };
    /**
     * Returns true if this dictionary contains a mapping for the specified key.
     * @param {Object} key key whose presence in this dictionary is to be
     * tested.
     * @return {boolean} true if this dictionary contains a mapping for the
     * specified key.
     */
    Dictionary.prototype.containsKey = function (key) {
        //return !util.isUndefined(this.get(key));
        return !isUndefined(this.get(key));
    };
    Dictionary.prototype.has = function (key) {
        //return !util.isUndefined(this.get(key));
        return !isUndefined(this.get(key));
    };
    /**
    * Removes all mappings from this dictionary.
    * @this {collections.Dictionary}
    */
    Dictionary.prototype.clear = function () {
        this.table = {};
        this.nElements = 0;
    };
    /**
     * Returns the number of keys in this dictionary.
     * @return {number} the number of key-value mappings in this dictionary.
     */
    Dictionary.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this dictionary contains no mappings.
     * @return {boolean} true if this dictionary contains no mappings.
     */
    Dictionary.prototype.isEmpty = function () {
        return this.nElements <= 0;
    };
    Dictionary.prototype.toString = function () {
        var toret = '{';
        this.forEach(function (k, v) {
            toret += "\n\t" + k + " : " + v;
        });
        return toret + '\n}';
    };
    return Dictionary;
}()); // End of dictionary
//# sourceMappingURL=Dictionary.js.map