/** @type {Symbol} */
const INITIALIZED = Symbol();

/** Class representing Enum. */
export default class Enum {
    name;
    ordinal;

    constructor() {
        const clazz = this.constructor;
        if ({}.hasOwnProperty.call(clazz, INITIALIZED)) {
            throw new Error('Enum classes can’t be instantiated after freeze.');
        }
        if (!{}.hasOwnProperty.call(clazz, '_enumValues')) {
            Object.defineProperty(clazz, '_enumValues', {
                value: [], configurable: false, writable: false, enumerable: false,
            });
        }
        clazz._enumValues.push(this);
    }

    /**
     * Initialize and freeze the enum class.
     * @returns {Enum} Reference to this Enum class.
     */
    static freeze() {
        if ({}.hasOwnProperty.call(this, INITIALIZED)) {
            return this;
        }
        if (this._enumValues.length === 0) {
            throw new Error("Can’t have an enum without any constants (type=’" + this.name + "’)");
        }
        Object.keys(this).forEach(key => {
            const value = this[key];
            const index = this._enumValues.indexOf(value);
            if (index !== -1) {
                value.name = key;
                value.ordinal = index;
            }
        });
        Object.freeze(this._enumValues);
        this[INITIALIZED] = true;
        return this;
    }

    /**
     * Returns the values of enum.
     * @returns {Array.<Enum>} Enum values.
     */
    static values() {
        return this._enumValues;
    }

    /**
     * Finds enum by name.
     * @param {string} name - The enum name.
     * @returns {Enum} Enum value with given name
     */
    static valueOf(name) {
        return this._enumValues.find(x => x.name === name);
    }

    /**
     * Makes enum classes iterable.
     * @returns {Iterator} Iterator for enum values.
     */
    static [Symbol.iterator]() {
        return this._enumValues[Symbol.iterator]();
    }

    toString() {
        return `${this.constructor.name}.${this.name}`;
    }
}
