/*

    TODO:

    List all class variables at start of class
        (the 'this.variablename' variables)
    Check null and undefined so they are used correctly
    Ensure JSDocs are in everything

*/



/**
 * Base class for time-related classes.
 */
export class Chrono extends Date {

    /**
     * The Date representing time = 0.
     * @constant
     */
    static DATE_ZERO = new Date(Chrono.Chrono(0, 0, 0, 0, 0, 0, 0));


    /**
     * Constructs a Chrono based on the legacy Javascript Date object.
     * If no Date is supplied, a new Date is created.
     * @param {Date} date A builtin Javascript Date object.
     */
    constructor(date = new Date()) {
        super(date);
    }


    /**
     * Constructs a Chrono with supplied parameters.
     * @param {Number} year
     * @param {Number} month
     * @param {Number} date
     * @param {Number} hours
     * @param {Number} minutes
     * @param {Number} seconds
     * @param {Number} milliseconds
     * @return {Chrono}
     */
    static Chrono(year = 0, month = 0, date = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
        var newDate = new Date();
        newDate.setFullYear(year, month, date);
        newDate.setHours(hours, minutes, seconds, milliseconds);
        return new Chrono(newDate);
    }


    _getUnit(func) {
        if (this.getTime() == Chrono.DATE_ZERO.getTime())
            return 0;
        else
            return func.call(this);
    }


    /**
     * Utility function for 'with' functions (withDate(), etc.).
     * @param {Array} list 
     * @returns {Array}
     */
    static #filterUndefined(list) {
        return list.filter((v) => v != undefined);
    }


    /**
     * An in-place modification of the year value in the
     * Chrono object, relative to the Chrono itself.
     * @param {Number} year 
     * @param {Number} month 
     * @param {Number} date 
     * @returns {Number}
     */
    incrementFullYear(year, month = 0, date = 0) {
        return this.setFullYear(
            this.getFullYear() + year,
            this.getMonth() + month,
            this.getDate() + date
        );
    }


    /**
     * An in-place modification of the month value in the
     * Chrono object, relative to the Chrono itself.
     * @param {Number} month 
     * @param {Number} date 
     * @returns {Number}
     */
    incrementMonth(month, date = 0) {
        return this.setMonth(
            this.getMonth() + month,
            this.getDate() + date
        );
    }


    /**
     * An in-place modification of the day-of-the-month value in the
     * Chrono object, relative to the Chrono itself.
     * @param {Number} month 
     * @param {Number} date 
     * @returns {Number}
     */
    incrementDate(date) {
        return this.setDate(
            this.getDate() + date
        );
    }


    /**
     * An in-place modification of the hours value in the
     * Chrono object, relative to the Chrono itself.
     * @param {Number} hours 
     * @param {Number} min 
     * @param {Number} sec 
     * @param {Number} ms 
     * @returns {Number}
     */
    incrementHours(hours, min = 0, sec = 0, ms = 0) {
        return this.setHours(
            this.getHours() + hours,
            this.getMinutes() + min,
            this.getSeconds() + sec,
            this.getMilliseconds() + ms
        );
    }


    /**
     * An in-place modification of the minutes value in the
     * Chrono object, relative to the Chrono itself.
     * @param {Number} min 
     * @param {Number} sec 
     * @param {Number} ms 
     * @returns {Number}
     */
    incrementMinutes(min, sec = 0, ms = 0) {
        return this.setMinutes(
            this.getMinutes() + min,
            this.getSeconds() + sec,
            this.getMilliseconds() + ms
        );
    }


    /**
     * An in-place modification of the seconds value in the
     * Chrono object, relative to the Chrono itself.
     * @param {Number} sec 
     * @param {Number} ms 
     * @returns {Number}
     */
    incrementSeconds(sec, ms = 0) {
        return this.setSeconds(
            this.getSeconds() + sec,
            this.getMilliseconds() + ms
        );
    }


    /**
     * An in-place modification of the milliseconds value in the
     * Chrono object, relative to the Chrono itself.
     * @param {Number} ms 
     * @returns {Number}
     */
    incrementMilliseconds(ms) {
        return this.setMilliseconds(
            this.getMilliseconds() + ms
        );
    }


    /**
     * Creates a new Chrono using the current one as a base.
     * @param {Number} year 
     * @param {Number} month 
     * @param {Number} date 
     * @returns {Chrono}
     */
    withFullYear(year, month = undefined, date = undefined) {
        var newChrono = new this.constructor(this);
        newChrono.setFullYear(year, ...Chrono.#filterUndefined([month, date]));
        return newChrono;
    }


    /**
     * Creates a new Chrono using the current one as a base.
     * @param {Number} month 
     * @param {Number} date 
     * @returns {Chrono}
     */
    withMonth(month, date = undefined) {
        var newChrono = new this.constructor(this);
        newChrono.setMonth(month, ...Chrono.#filterUndefined([date]));
        return newChrono;
    }


    /**
     * Creates a new Chrono using the current one as a base.
     * @param {Number} date 
     * @returns {Chrono}
     */
    withDate(date) {
        var newChrono = new this.constructor(this);
        newChrono.setDate(date);
        return newChrono;
    }


    /**
     * Creates a new Chrono using the current one as a base.
     * @param {Number} hours 
     * @param {Number} min 
     * @param {Number} sec 
     * @param {Number} ms 
     * @returns {Chrono}
     */
    withHours(hours, min = undefined, sec = undefined, ms = undefined) {
        var newChrono = new this.constructor(this);
        newChrono.setHours(hours, ...Chrono.#filterUndefined([min, sec, ms]));
        return newChrono;
    }


    /**
     * Creates a new Chrono using the current one as a base.
     * @param {Number} min 
     * @param {Number} sec 
     * @param {Number} ms 
     * @returns {Chrono}
     */
    withMinutes(min, sec = undefined, ms = undefined) {
        var newChrono = new this.constructor(this);
        newChrono.setMinutes(min, ...Chrono.#filterUndefined([sec, ms]));
        return newChrono;
    }


    /**
     * Creates a new Chrono using the current one as a base.
     * @param {Number} sec 
     * @param {Number} ms 
     * @returns {Chrono}
     */
    withSeconds(sec, ms = undefined) {
        var newChrono = new this.constructor(this);
        newChrono.setSeconds(sec, ...Chrono.#filterUndefined([ms]));
        return newChrono;
    }


    /**
     * Creates a new Chrono using the current one as a base.
     * @param {Number} ms 
     * @returns {Chrono}
     */
    withMilliseconds(ms) {
        var newChrono = new this.constructor(this);
        newChrono.setMilliseconds(ms);
        return newChrono;
    }


    /**
     * getTime(), relative to dateZero.
     */
    getTimeRelative() {
        return this.difference(new this.constructor(Chrono.DATE_ZERO));
    }


    /**
     * Compare a Chrono with dateZero.
     * @return {Boolean}
     */
    isZero() {
        return this.equals(new this.constructor(Chrono.DATE_ZERO));
    }


    /**
     * Returns the weekday as a String.
     * @return {String}
     */
    getWeekday() {
        return weekdayNames[this.getDay()];
    }


    /**
     * Add two Chronos together.
     * @param {Chrono} other 
     * @return {Chrono}
     */
    add(other) {
        if (this.constructor.name != other.constructor.name)
            throw new TypeError(`This ${this.constructor.name} does not match parameter type (${other.constructor.name})`);

        return Chrono.Chrono(
            this.getFullYear() + other.getFullYear(),
            this.getMonth() + other.getMonth(),
            this.getDate() + other.getDate(),
            this.getHours() + other.getHours(),
            this.getMinutes() + other.getMinutes(),
            this.getSeconds() + other.getSeconds(),
            this.getMilliseconds() + other.getMilliseconds()
        );
    }


    /**
     * Subtract a Chrono from another Chrono.
     * Returns dateZero if 'other' is chronologically after 'this'.
     * @param {Chrono} other 
     * @return {Chrono}
     */
    subtract(other) {
        if (this.constructor.name != other.constructor.name)
            throw new TypeError(`This ${this.constructor.name} object does not match parameter type (${other.constructor.name})`);

        if (this.getTime() - other.getTime() < 0)
            return Chrono.DATE_ZERO;

        return Chrono.Chrono(
            this.getFullYear() - other.getFullYear(),
            this.getMonth() - other.getMonth(),
            this.getDate() - other.getDate(),
            this.getHours() - other.getHours(),
            this.getMinutes() - other.getMinutes(),
            this.getSeconds() - other.getSeconds(),
            this.getMilliseconds() - other.getMilliseconds()
        );

    }


    /**
     * Subtract a Chrono from another Chrono.
     * Returns the difference in milliseconds.
     * @param {Chrono} other 
     * @return {Number}
     */
    difference(other) {
        if (this.constructor.name != other.constructor.name)
            throw new TypeError(`This ${this.constructor.name} object does not match parameter type (${other.constructor.name})`);

        return this.getTime() - other.getTime();

    }


    /**
     * Compare a Chrono with another Chrono.
     * @param {Chrono} other 
     * @return {Chrono}
     */
    greaterThan(other) {
        return this.difference(other) > 0;
    }


    /**
     * Compare a Chrono with another Chrono.
     * @param {Chrono} other 
     * @return {Chrono}
     */
    greaterThanOrEquals(other) {
        return this.difference(other) >= 0;
    }


    /**
     * Compare a Chrono with another Chrono.
     * @param {Chrono} other 
     * @return {Chrono}
     */
    lessThan(other) {
        return this.difference(other) < 0;
    }


    /**
     * Compare a Chrono with another Chrono.
     * @param {Chrono} other 
     * @return {Chrono}
     */
    lessThanOrEquals(other) {
        return this.difference(other) <= 0;
    }


    /**
     * Compare a Chrono with another Chrono.
     * @param {Chrono} other 
     * @return {Chrono}
     */
    equals(other) {
        return this.difference(other) == 0;
    }


    /**
     * The year, month, date, hours, minutes, seconds, and milliseconds.
     * @return {Generator<Number>}
     */
    *asList() {
        yield this.getFullYear();
        yield this.getMonth();
        yield this.getDate();
        yield this.getHours();
        yield this.getMinutes();
        yield this.getSeconds();
        yield this.getMilliseconds();
    }

}
