import { Chrono } from "../../chrono/chrono.js";
import { Time } from "../../chrono/time.js";
import { Period } from "./period.js";



/**
 * Manages a period in a schedule table HTML element.
 */
export class PeriodScheduleTableHTML extends Period {

    /** Reference to the HTMLTableRowElement */
    _periodHTML;

    /** @return {HTMLTableRowElement} */
    get periodHTML() {
        return this._periodHTML;
    }

    /** @param {HTMLTableRowElement} value */
    set periodHTML(value) {
        this._periodHTML = value;
        this._progressHTML = (value) ? value.querySelector("progress") : null;
    }


    /** Reference to the HTMLProgressElement */
    _progressHTML;

    /** @return {HTMLProgressElement} */
    get progressHTML() {
        return this._progressHTML;
    }

    /** @param {HTMLProgressElement} value */
    set progressHTML(value) {
        throw new Error("Cannot set to read-only variable (PeriodScheduleTableHTML instance).progressHTML");
    }


    /**
     * Constructs a PeriodScheduleTableHTML.
     * @param {Period} period 
     */
    constructor(period, periodHTML) {
        super(
            period.name,
            period.startTime,
            period.endTime,
            period.transitionBefore,
            period.trueStartTime,
            period.trueEndTime
        );

        this.periodHTML = periodHTML;
    }


    /**
     * Formats the period HTML to display the relevant information
     * (period name, period start/end times, duration).
     */
    constructPeriod() {
        this.periodHTML.querySelector(".periodTextCell").textContent = this.name;

        var startTime = PeriodScheduleTableHTML.#formatToTimeString(this.startTime);
        var endTime = PeriodScheduleTableHTML.#formatToTimeString(this.endTime);
        var duration = PeriodScheduleTableHTML.#formatToDurationString(this.duration);
        this.periodHTML.querySelector(".timeTextCell").textContent = `${startTime} - ${endTime} (${duration})`;
        
        this.periodHTML.querySelector("progress").value = 0;
    }


    /**
     * Makes the row yellow if the current time is in the period,
     * and updates the value of the progress bar.
     * @param {Time} time 
     */
    updatePeriod(time = new Time()) {
        if (0 <= this.progress(time) && this.progress(time) < 1)
            this.periodHTML.style.backgroundColor = "#ffd966";
        else
            this.periodHTML.style.backgroundColor = "#ffffff";

        this.progressHTML.value = this.progress(time);
    }
    
    
    /**
     * Runs a loop which continuously calls a function.
     * Mimics Until functionality.
     * @return {Boolean} Returns on success.
     */
    startUpdateLoop() {
        if (0 <= this.progress() && this.progress() < 1) {
            super.startUpdateLoop(this.#runUpdateLoop, 1000);
        } else {
            this.updatePeriod();

            // Wait until the next period starts (or not, if period has already begun/ended)
            this.periodHTML.style.backgroundColor = "#e3e3e3";
            setTimeout(
                super.startUpdateLoop.bind(this, this.#runUpdateLoop, 1000),
                this.timeUntilStart().getTimeRelative() + 25 // add a few ms for style!
            );
        }

        return true;
    }


    #runUpdateLoop() {
        this.updatePeriod();
        
        if (this.progress() > 1)
            this.stopUpdateLoop();
    }


    /**
     * Abuse Date (and String) methods to make it work. Format: {h:mm}
     * @param {Time} time 
     * @return {String}
     */
    static #formatToTimeString(time) {
        return time
            .toLocaleTimeString(undefined, {"hour":"numeric","minute":"2-digit"})
            .toLocaleLowerCase()
            .substring(0,5)
            .trimEnd();
    }


    /**
     * Construct this format from individual time components. Format: {(h:)mm}
     * @param {Time} time 
     * @return {String}
     */
    static #formatToDurationString(time) {
        var result = "";

        if (time.getHours() == 0) {
            result += time.getMinutes();
        } else {
            result += time.getHours() % 12;
            result += ":";
            result += String(time.getMinutes()).padStart(2, "0");
        }

        return result;
    }

}