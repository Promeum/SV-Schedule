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
        var newDate = date;
        newDate.setHours(0, 0, 0, 0);
        super(newDate);
    }


    /**
     * Constructs a Calendar by supplied parameters.
     * @param {Number} year
     * @param {Number} month
     * @param {Number} date
     * @return {Calendar}
     */
    static Calendar(year, month, date) {
        return new Calendar(super.Chrono(year, month, date, 0, 0, 0, 0));
    }


    getFullYear() { return this._getUnit(super.getFullYear); }
    getMonth() { return this._getUnit(super.getMonth); }
    getDate() { return this._getUnit(super.getDate); }

    
    getHours() { return 0; }
    getMinutes() { return 0; }
    getSeconds() { return 0; }
    getMilliseconds() { return 0; }


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
     * @return {Generator<Number>} The year, month, and date.
     */
    *asList() {
        yield this.getFullYear();
        yield this.getMonth();
        yield this.getDate();
    }


    /**
     * Returns a string representation of a Calendar in {MM/DD/YYYY} format.
     * @return {String}
     */
    toString() {
        var YYYY = this.getFullYear().toString().padStart(4, "0");
        var MM = (this.getMonth() + 1).toString().padStart(2, "0");
        var DD = this.getDate().toString().padStart(2, "0");

        return `${MM}/${DD}/${YYYY}`;
    }

}
