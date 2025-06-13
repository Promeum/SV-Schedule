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
        var newChrono = new Chrono(date);
        newChrono.setFullYear(0, 0, 0);
        super(newChrono);
    }


    /**
     * Constructs a Time with supplied parameters.
     * @param {Number} hours
     * @param {Number} minutes
     * @param {Number} seconds
     * @param {Number} milliseconds
     * @return {Time}
     */
    static Time(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
        return new Time(super.Chrono(0, 0, 0, hours, minutes, seconds, milliseconds));
    }

    
    getFullYear() { return 0; }
    getMonth() { return 0; }
    getDate() { return 0; }
    getDay() { throw new TypeError(`Function getDay() cannot be called on object of type Time`); }
    getWeekday() { throw new TypeError(`Function getWeekday() cannot be called on object of type Time`); }


    getHours() { return this._getUnit(super.getHours); }
    getMinutes() { return this._getUnit(super.getMinutes); }
    getSeconds() { return this._getUnit(super.getSeconds); }
    getMilliseconds() { return this._getUnit(super.getMilliseconds); }


    setFullYear() { throw new TypeError(`Function setFullYear() cannot be called on object of type Time`); }
    setMonth() { throw new TypeError(`Function setMonth() cannot be called on object of type Time`); }
    setDate() { throw new TypeError(`Function setDate() cannot be called on object of type Time`); }


    incrementFullYear() { throw new TypeError(`Function incrementFullYear() cannot be called on object of type Time`); }
    incrementMonth() { throw new TypeError(`Function incrementMonth() cannot be called on object of type Time`); }
    incrementDate() { throw new TypeError(`Function incrementDate() cannot be called on object of type Time`); }


    withFullYear() { throw new TypeError(`Function withFullYear() cannot be called on object of type Time`); }
    withMonth() { throw new TypeError(`Function withMonth() cannot be called on object of type Time`); }
    withDate() { throw new TypeError(`Function withDate() cannot be called on object of type Time`); }


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
     * Subtract a Time from another Time.
     * Returns the difference in milliseconds.
     * @param {Time} other 
     * @return {Number}
     */
    difference(other) {
        return super.difference(other);
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
