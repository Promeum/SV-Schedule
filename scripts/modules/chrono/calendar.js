import { Chrono } from "./chrono.js";



/**
 * Holds a year, month, date, and also weekday.
 */
export class Calendar extends Chrono {

    /**
     * The names of all the weekdays as strings.
     * @constant
     */
    static weekdayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    /**
     * Constructs a Calendar based on the legacy Javascript Date object.
     * If no Date is supplied, a new Date is created.
     * @param {Date} date A builtin Javascript Date object.
     */
    constructor(date = new Date()) {
        var newChrono = new Chrono(date);
        newChrono.setHours(0, 0, 0, 0);
        super(newChrono);
    }


    /**
     * Constructs a Calendar by supplied parameters.
     * @param {Number} year
     * @param {Number} month
     * @param {Number} date
     * @return {Calendar}
     */
    static Calendar(year = 0, month = 0, date = 0) {
        return new Calendar(super.Chrono(year, month, date, 0, 0, 0, 0));
    }


    getFullYear() { return this._getUnit(super.getFullYear); }
    getMonth() { return this._getUnit(super.getMonth); }
    getDate() { return this._getUnit(super.getDate); }

    
    getHours() { return 0; }
    getMinutes() { return 0; }
    getSeconds() { return 0; }
    getMilliseconds() { return 0; }


    setHours() { throw new TypeError(`Function setHours() cannot be called on object of type Calendar`); }
    setMinutes() { throw new TypeError(`Function setMinutes() cannot be called on object of type Calendar`); }
    setSeconds() { throw new TypeError(`Function setSeconds() cannot be called on object of type Calendar`); }
    setMilliseconds() { throw new TypeError(`Function setMilliseconds() cannot be called on object of type Calendar`); }


    incrementHours() { throw new TypeError(`Function incrementHours() cannot be called on object of type Calendar`); }
    incrementMinutes() { throw new TypeError(`Function incrementMinutes() cannot be called on object of type Calendar`); }
    incrementSeconds() { throw new TypeError(`Function incrementSeconds() cannot be called on object of type Calendar`); }
    incrementMilliseconds() { throw new TypeError(`Function incrementMilliseconds() cannot be called on object of type Calendar`); }


    withHours() { throw new TypeError(`Function withHours() cannot be called on object of type Calendar`); }
    withMinutes() { throw new TypeError(`Function withMinutes() cannot be called on object of type Calendar`); }
    withSeconds() { throw new TypeError(`Function withSeconds() cannot be called on object of type Calendar`); }
    withMilliseconds() { throw new TypeError(`Function withMilliseconds() cannot be called on object of type Calendar`); }


    /**
     * Add two Calendars together.
     * @param {Calendar} other 
     * @return {Calendar}
     */
    add(other) {
        return new Calendar(super.add(other));
    }


    /**
     * Subtract a Calendar from another Calendar.
     * @param {Calendar} other 
     * @return {Calendar}
     */
    subtract(other) {
        return new Calendar(super.subtract(other));
    }


    /**
     * Subtract a Calendar from another Calendar.
     * Returns the difference in milliseconds.
     * @param {Calendar} other 
     * @return {Number}
     */
    difference(other) {
        return super.difference(other);
    }


    /**
     * @return {Generator<Number>} The year, month, and date.
     */
    *asList() {
        yield this.getFullYear();
        yield this.getMonth();
        yield this.getDate();
    }


    /**
     * Returns a string representation of a Calendar in {M/D/Y} format.
     * @return {String}
     */
    toString() {
        var Y = this.getFullYear().toString();
        var M = (this.getMonth() + 1).toString();
        var D = this.getDate().toString();

        return `${M}/${D}/${Y}`;
    }

}
