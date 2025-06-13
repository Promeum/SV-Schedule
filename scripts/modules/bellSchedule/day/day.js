import { Chrono } from "../../chrono/chrono.js";
import { Time } from "../../chrono/time.js";
import { Calendar } from "../../chrono/calendar.js";
import { TimeCalendar } from "../../chrono/timecalendar.js";
import { Until } from "../../until/until.js";
import { BellSchedule } from "../bellSchedule.js";
import { Databases } from "../../../databases.js";



/**
 * Stores a single specific day.
 */
export class Day extends BellSchedule {
    
    /**
     * Constructs a Day.
     * @param {Calendar} date 
     * @param {BellSchedule} bellSchedule 
     * @param {String} alias Defaults to bellSchedule.defaultAlias if left undefined
     * @param {String} color Must evaluate to a CSS color. Defaults to bellSchedule.defaultColor if left undefined
     * @param {String} comments 
     * @param {String} extraComments 
     */
    constructor(date, bellSchedule, alias = undefined, color = undefined, comments = undefined, extraComments = undefined) {
        super(bellSchedule.id, bellSchedule.defaultAlias, bellSchedule.defaultColor, bellSchedule.periods);
        this.date = date;
        this.alias = alias ?? bellSchedule.defaultAlias;
        this.color = color ?? bellSchedule.defaultColor;
        this.comments = comments;
        this.extraComments = extraComments;
    }


    static Day(date, options) {
        var newDay = new Day(date, Databases.getSchedule(options["bellScheduleId"]))
        
        for (const option in options) {
            const optionParameter = options[option];
            newDay[option] = optionParameter;
        }
        
        return newDay;
    }


    /**
     * 
     * @param {Calendar} date 
     * @return {Boolean}
     */
    isToday(date = new Calendar()) {
        return this.date.equals(date);
    }


    currentPeriodOrTransition(time = new Time()) {
        return (this.isToday()) ? super.currentPeriodOrTransition(time) : null;
    }


    currentPeriod(time = new Time()) {
        return (this.isToday()) ? super.currentPeriod(time) : null;
    }


    currentTransition(time = new Time()) {
        return (this.isToday()) ? super.currentTransition(time) : null;
    }


    nextPeriodOrTransition(time = new Time()) {
        return (this.isToday()) ? super.nextPeriodOrTransition(time) : null;
    }


    nextPeriod(time = new Time()) {
        return (this.isToday()) ? super.nextPeriod(time) : null;
    }


    nextTransition(time = new Time()) {
        return (this.isToday()) ? super.nextTransition(time) : null;
    }


    inAPeriodOrTransition(time = new Time()) {
        return (this.isToday()) ? super.inAPeriodOrTransition(time) : null;
    }


    inAPeriod(time = new Time()) {
        return (this.isToday()) ? super.inAPeriod(time) : false;
    }


    inATransition(time = new Time()) {
        return (this.isToday()) ? super.inATransition(time) : false;
    }

}
