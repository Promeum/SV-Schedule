import { Chrono } from "./chrono.js";



/**
 * Holds hours, minutes, seconds, and milliseconds.
 */
export class Time extends Chrono {

    /**
     * Constructs a Time based on the legacy Javascript Date object.
     * If no Date is supplied, a new Date is created.
     * @param {Date} date A builtin Javascript Date object.
     */
    constructor(date = new Date()) {
        var newDate = date;
        newDate.setFullYear(0, 0, 0);
        super(newDate);
    }


    /**
     * Constructs a Time with supplied parameters.
     * @param {Number} hours
     * @param {Number} minutes
     * @param {Number} seconds
     * @param {Number} milliseconds
     * @return {Time}
     */
    static Time(hours, minutes, seconds, milliseconds) {
        return new Time(super.Chrono(0, 0, 0, hours, minutes, seconds, milliseconds));
    }

    
    getFullYear() { return 0; }
    getMonth() { return 0; }
    getDate() { return 0; }
    getDay() { return 0; }
    getWeekday() { throw new TypeError(`${this.constructor.name} is not a function`) }


    getHours() { return this._getUnit(super.getHours); }
    getMinutes() { return this._getUnit(super.getMinutes); }
    getSeconds() { return this._getUnit(super.getSeconds); }
    getMilliseconds() { return this._getUnit(super.getMilliseconds); }


    /**
     * Add two Times together.
     * @param {Time} other 
     * @return {Time}
     */
    add(other) {
        return new Time(super.add(other));
    }


    /**
     * Subtract a Time from another Time.
     * @param {Time} other 
     * @return {Time}
     */
    subtract(other) {
        return new Time(super.subtract(other));
    }


    /**
     * The hours, minutes, seconds, and milliseconds.
     * @return {Generator<Number>}
     */
    *asList() {
        yield this.getHours();
        yield this.getMinutes();
        yield this.getSeconds();
        yield this.getMilliseconds();
    }


    /**
     * Returns a string representation of a Time in {hh:mm:ss} format.
     * @return {String}
     */
    toString() {
        var hh = this.getHours().toString().padStart(2, "0");
        var mm = this.getMinutes().toString().padStart(2, "0");
        var ss = this.getSeconds().toString().padStart(2, "0");

        return `${hh}:${mm}:${ss}`;
    }

}
