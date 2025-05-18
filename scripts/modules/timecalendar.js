import { Chrono } from "./chrono.js";
import { Time } from "./time.js";
import { Calendar } from "./calendar.js";



/**
 * Holds a Time and a Calendar.
 */
export class TimeCalendar extends Chrono {

    /**
     * Constructs a TimeCalendar based on the legacy Javascript Date object.
     * If no Date is supplied, a new Date is created.
     * @param {Date} date A builtin Javascript Date object.
     */
    constructor(date = new Date) {
        super(date);
    }


    /**
     * Constructs a TimeCalendar with supplied parameters.
     * @param {Number} year
     * @param {Number} month
     * @param {Number} date
     * @param {Number} hours
     * @param {Number} minutes
     * @param {Number} seconds
     * @param {Number} milliseconds
     * @return {TimeCalendar}
     */
    static TimeCalendar(year, month, date, hours, minutes, seconds, milliseconds) {
        return new TimeCalendar(
            super.Chrono(year, month, date, hours, minutes, seconds, milliseconds)
        );
    }


    /**
     * Constructs a TimeCalendar from a Time and a Calendar.
     * @param {Time} time
     * @param {Calendar} calendar
     * @return {TimeCalendar}
     */
    static combine(time, calendar) {
        return TimeCalendar.TimeCalendar(...calendar.asList(), ...time.asList());
    }


    getFullYear() { return this._getUnit(super.getFullYear); }
    getMonth() { return this._getUnit(super.getMonth); }
    getDate() { return this._getUnit(super.getDate); }
    getHours() { return this._getUnit(super.getHours); }
    getMinutes() { return this._getUnit(super.getMinutes); }
    getSeconds() { return this._getUnit(super.getSeconds); }
    getMilliseconds() { return this._getUnit(super.getMilliseconds); }


    /**
     * Add two TimeCalendars together.
     * @param {TimeCalendar} other 
     * @return {TimeCalendar}
     */
    add(other) {
        return new TimeCalendar(super.add(other));
    }


    /**
     * Subtract a TimeCalendar from another TimeCalendar.
     * @param {TimeCalendar} other 
     * @return {TimeCalendar}
     */
    subtract(other) {
        return new TimeCalendar(super.subtract(other));
    }


    /**
     * Returns a string representation of a TimeCalendar in {MM/DD/YYYY} format.
     * @return {String}
     */
    toString() {
        var calendarString = Calendar.Calendar(this.getFullYear(), this.getMonth(), this.getDate());
        var timeString = Time.Time(this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());

        return `${calendarString} ${timeString}`;
    }
}
