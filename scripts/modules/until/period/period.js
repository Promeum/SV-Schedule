import { Chrono } from "../../chrono/chrono.js";
import { Time } from "../../chrono/time.js";
import { Calendar } from "../../chrono/calendar.js";
import { TimeCalendar } from "../../chrono/timecalendar.js";
import { Until } from "../until.js";

// TODO: Have a HTML variable to make it be able to change its own html....
// or maybe just Create A New Class (ScheduleTablePeriod?) to extend this Period functionality!!!

/**
 * Stores a single class period.
 */
export class Period extends Until {

    /**
     * The length of time to offset the end of every period by,
     * to account for the actual time when the school bells ring.
     * @constant
     */
    static PERIOD_END_OFFSET_SECONDS = -42;


    /**
     * Constructs a Period.
     * @param {String} name 
     * @param {Time} startTime Shorthand/Decorative; gets displayed as text
     * @param {Time} endTime Shorthand/Decorative; gets displayed as text
     * @param {boolean} transitionBefore Overrides trueStartTime and startTime
     * @param {Time} trueStartTime Overrides startTime if defined
     * @param {Time} trueEndTime Overrides the period end offset and endTime if defined
     */
    constructor(name, startTime, endTime, transitionBefore = true, trueStartTime = undefined, trueEndTime = undefined) {
        super();
        
        // It is not possible to set the final values of trueStartTime
        // (and trueDuration in consequence) if transitionBefore == false,
        // since data from the previous Period is required.
        // Instead, this is handled in bellSchedule.
        
        this.startTime = startTime;
        this.endTime = endTime;

        this.trueStartTime = trueStartTime ?? startTime;
        this.trueEndTime;
        if (trueEndTime === undefined) {
            this.trueEndTime = new Time(endTime);
            this.trueEndTime.setSeconds(endTime.getSeconds() + Period.PERIOD_END_OFFSET_SECONDS);
        } else
            this.trueEndTime = trueEndTime;

        this.duration = endTime.subtract(startTime);
        this.trueDuration = this.trueEndTime.subtract(this.trueStartTime);

        this.name = name;

        this.transitionBefore = transitionBefore;

        if (this.trueStartTime.greaterThan(this.trueEndTime))
            throw new EvalError(`Evaluated trueStartTime > trueEndTime (${this.trueStartTime} > ${this.trueEndTime})`);
            
    }


    /**
     * Returns true if the time is within the bounds of the period.
     * @param {Time} time 
     * @return {Boolean}
     */
    inPeriod(time = new Time()) {
        var progress = this.progress(time);
        return 0 <= progress && progress < 1;
    }


    /**
     * Returns a Time instance representing the time elapsed until the start of this period.
     * @param {Time} time 
     * @return {Time}
     */
    timeUntilStart(time = new Time()) {
        return this.trueStartTime.subtract(time);
    }


    /**
     * Returns a Time instance representing the time elapsed since the start of this period.
     * @param {Time} time 
     * @return {Time}
     */
    timeSinceStart(time = new Time()) {
        return time.subtract(this.trueStartTime);
    }


    /**
     * Returns a Time instance representing the time remaining until the end of this period.
     * @param {Time} time 
     * @return {Time}
     */
    timeUntilEnd(time = new Time()) {
        return this.trueEndTime.subtract(time);
    }


    /**
     * Returns a decimal representing how much of the period has elapsed.
     * @param {Time} time
     * @return {Number} A decimal. 0: time == trueStartTime, 1: time == trueEndTime
     */
    progress(time = new Time()) {
        var msSinceStart = time.difference(this.trueStartTime);
        var msDuration = this.trueEndTime.difference(this.trueStartTime);
        return msSinceStart / msDuration;
    }

}
