/**
 * Base class for time-related classes.
 */
export class Chrono extends Date {

    /**
     * The Date representing t=0.
     * Use getTime() to get relative differences.
     */
    static dateZero = new Date(Chrono.Chrono(0,0,0,0,0,0,0));


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
    static Chrono(year, month, date, hours, minutes, seconds, milliseconds) {
        var newDate = new Date();
        newDate.setFullYear(year, month, date);
        newDate.setHours(hours, minutes, seconds, milliseconds);
        return new Chrono(newDate);
    }


    _getUnit(func) {
        if (this.getTime() == Chrono.dateZero.getTime())
            return 0;
        else
            return func.call(this);
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
     * @param {Chrono} other 
     * @return {Chrono}
     */
    subtract(other) {
        if (this.constructor.name != other.constructor.name)
            throw new TypeError(`This ${this.constructor.name} object does not match parameter type (${other.constructor.name})`);

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
     * Compare a Chrono with another Chrono.
     * @param {Chrono} other 
     * @return {Chrono}
     */
    greaterThan(other) {
        return this.getTime() - other.getTime() > 0;
    }


    /**
     * Compare a Chrono with another Chrono.
     * @param {Chrono} other 
     * @return {Chrono}
     */
    lessThan(other) {
        return this.getTime() - other.getTime() < 0;
    }


    /**
     * Compare a Chrono with another Chrono.
     * @param {Chrono} other 
     * @return {Chrono}
     */
    equals(other) {
        return this.getTime() - other.getTime() == 0;
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
