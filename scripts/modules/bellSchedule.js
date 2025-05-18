import { Time } from "./modules/time.js";
import { Calendar } from "./modules/calendar.js";
import { TimeCalendar } from "./modules/timecalendar.js";



const PERIOD_END_OFFSET_SECONDS = -42;



export class BellSchedule {

    /**
     * 
     * @param {String} id 
     * @param {String} alias 
     * @param {Period[]} periods 
     */
    constructor(id, alias, periods) {
        this.id = id;
        this.alias = alias;
        this.defaultAlias = defaultAlias;
        this.periods = periods;
        this.transitions = null;
    }

}



/**
 * Stores a single class period.
 */
export class Period {

    /**
     * Constructs a Period.
     * @param {String} name 
     * @param {Time} startTime 
     * @param {Time} endTime 
     * @param {number} periodEndOffsetSeconds 
     */
    constructor(name, startTime, endTime, periodEndOffsetSeconds = PERIOD_END_OFFSET_SECONDS) {
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;

        this.trueEndTime = this.endTime;
        this.trueEndTime.setMilliseconds(periodEndOffsetSeconds * 1000);

        this.duration = endTime.subtract(startTime);

        this.trueDuration = this.trueEndTime.subtract(this.startTime);
    }


    /**
     * Returns a Time instance representing the time elapsed since the start of this period.
     * @param {Time} time 
     * @return {Time}
     */
    timeSinceStart(time = new Time()) {
        return time.subtract(this.startTime);
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
     * @return {Number} A decimal. 0: time == startTime, 1: time == endTime
     */
    progress(time = new Time()) {
        var msSinceStart = time.getTime() - this.startTime.getTime();
        var msDuration = this.trueEndTime.getTime() - this.startTime.getTime();

        return msSinceStart / msDuration;
    }

}
