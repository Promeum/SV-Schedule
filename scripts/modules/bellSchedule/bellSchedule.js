import { Chrono } from "../chrono/chrono.js";
import { Time } from "../chrono/time.js";
import { Calendar } from "../chrono/calendar.js";
import { TimeCalendar } from "../chrono/timecalendar.js";
import { Until } from "../until/until.js";
import { Period } from "../until/period/period.js";
import { Databases } from "../../databases.js";



/**
 * Stores a single bell schedule.
 */
export class BellSchedule {

    /**
     * Constructs a BellSchedule.
     * @param {String} id 
     * @param {String} defaultAlias 
     * @param {String} defaultColor Must evaluate to a CSS color.
     * @param {Period[]} periods 
     */
    constructor(id, defaultAlias, defaultColor, periods) {
        this.id = id;
        this.defaultAlias = defaultAlias;
        this.defaultColor = defaultColor;
        this.periods = periods;

        if (!this.periods) {
            console.warn(`BellSchedule "${this.defaultAlias}" (${this.id}) instantiated without periods!`);
            this.periods = [];
        }

        // Generate this.transitions and this.periodsAndTransitions
        this.transitions = [];
        this.periodsAndTransitions = (this.periods.length > 0) ? [this.periods[0]] : [];

        for (let i = 0; i < this.periods.length - 1; i++) {
            const period = this.periods[i];
            const nextPeriod = this.periods[i + 1];

            if (period.trueEndTime.lessThanOrEquals(nextPeriod.trueStartTime)) {
                if (nextPeriod.transitionBefore) {
                    var newTransition = new Period(
                        "Transition",
                        period.endTime,
                        nextPeriod.startTime,
                        false,
                        period.trueEndTime,
                        nextPeriod.trueStartTime
                    );
                    this.transitions.push(newTransition);
                    this.periodsAndTransitions.push(newTransition);
                } else {
                    // Set the final value of nextPeriod.trueStartTime
                    // and nextPeriod.trueDuration.
                    // The first Period of the day will not be
                    // affected by the transitionBefore variable.
                    nextPeriod.trueStartTime = period.trueEndTime;
                    nextPeriod.trueDuration = nextPeriod.trueEndTime.subtract(nextPeriod.trueStartTime);
                }
            }

            this.periodsAndTransitions.push(nextPeriod);
        }
    }


    /**
     * Returns the current period or transition, or null if there is none.
     * @param {Period[]} array 
     * @param {Time} time 
     * @return {Period?}
     */
    #currentPeriodOrTransition(array, time = new Time()) {
        for (const periodOrTransition of array)
            if (periodOrTransition.inPeriod(time))
                return periodOrTransition;
        return null;
    }


    /**
     * Returns the current period or transition, or null if there is none.
     * @param {Time} time 
     * @return {Period?}
     */
    currentPeriodOrTransition(time = new Time()) {
        return this.#currentPeriodOrTransition(this.periodsAndTransitions, time);
    }


    /**
     * Returns the current period, or null if there is none.
     * @param {Time} time 
     * @return {Period?}
     */
    currentPeriod(time = new Time()) {
        return this.#currentPeriodOrTransition(this.periods, time);
    }


    /**
     * Returns the current transition, or null if there is none.
     * @param {Time} time 
     * @return {Period?}
     */
    currentTransition(time = new Time()) {
        return this.#currentPeriodOrTransition(this.transitions, time);
    }


    /**
     * Returns the next period or transition, or null if there is none.
     * @param {Period[]} array 
     * @param {Time} time 
     * @return {Period?}
     */
    #nextPeriodOrTransition(array, time = new Time()) {
        var index = 0;
        for (index = 0; index < array.length; index++) {
            const periodOrTransition = array[index];
            if (periodOrTransition.inPeriod(time))
                break;
        }
        return array[index + 1] ?? null;
    }


    /**
     * Returns the next period or transition, or null if there is none.
     * @param {Time} time 
     * @return {Period?}
     */
    nextPeriodOrTransition(time = new Time()) {
        return this.#nextPeriodOrTransition(this.periodsAndTransitions, time);
    }


    /**
     * Returns the next period, or null if there is none.
     * @param {Time} time 
     * @return {Period?}
     */
    nextPeriod(time = new Time()) {
        return this.#nextPeriodOrTransition(this.periods, time);
    }


    /**
     * Returns the next transition, or null if there is none.
     * @param {Time} time 
     * @return {Period?}
     */
    nextTransition(time = new Time()) {
        return this.#nextPeriodOrTransition(this.transitions, time);
    }


    /**
     * Returns true if there is a period or transition going on.
     * @param {Time} time 
     * @return {Boolean}
     */
    inAPeriodOrTransition(time = new Time()) {
        return Boolean(this.currentPeriodOrTransition(time));
    }


    /**
     * Returns true if there is a period going on.
     * @param {Time} time 
     * @return {Boolean}
     */
    inAPeriod(time = new Time()) {
        return Boolean(this.currentPeriod(time));
    }


    /**
     * Returns true if there is a transition going on.
     * @param {Time} time 
     * @return {Boolean}
     */
    inATransition(time = new Time()) {
        return Boolean(this.currentTransition(time));
    }

}
