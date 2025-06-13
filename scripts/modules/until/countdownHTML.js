import { Calendar } from "../chrono/calendar.js";
import { TimeCalendar } from "../chrono/timecalendar.js";
import { Until } from "./until.js";
import { Databases } from "../../databases.js";



/**
 * Manages countdown HTML elements leading up to special events (such as the end of school).
 */
export class CountdownHTML extends Until {

    /**
     * The plural and non-plural forms of the names
     * of the units of time.
     * @constant
     */
    static UNIT_PLURALITY_FORMS = {
        "countdownUnitDays": {
            "nonPlural": "day",
            "plural": "days",
        },
        "countdownUnitSchoolDays": {
            "nonPlural": "school day",
            "plural": "school days",
        },
        "countdownUnitHours": {
            "nonPlural": "hour",
            "plural": "hours",
        },
        "countdownUnitMinutes": {
            "nonPlural": "minute",
            "plural": "minutes",
        },
        "countdownUnitSeconds": {
            "nonPlural": "second",
            "plural": "seconds",
        },
        "countdownUnitMilliseconds": {
            "nonPlural": "millisecond",
            "plural": "milliseconds"
        }
    }


    /**
     * 
     * @param {HTMLDivElement} countdownHTML class="countdownUnitContainer"
     * @param {TimeCalendar} endTimeCalendar The TimeCalendar the coundown shall end at.
     * @param {String} finishColor The CSS color/gradient of the countdown background when the countdown expires.
     */
    constructor(endTimeCalendar, countdownHTML, finishColor = "linear-gradient(180deg, #e9ca92 20%, #e3836e 49%, #c08323 50%, #ffb13e 53%, #e66465 95%)") {
        super();
        this.end = endTimeCalendar;
        this.countdownHTML = countdownHTML;
        this.finishColor = finishColor;
    }


    /**
     * Update a specific unit of a countdown element.
     * @param {String} className The class name of the element which displays the unit of time.
     * @param {Number} timeValue The time value to be updated.
     */
    updateUnit(className, timeValue) {
        for (const unitElement of this.countdownHTML.getElementsByClassName(className)) {
            for (const unitValueElement of unitElement.querySelectorAll(".unitValue"))
                unitValueElement.textContent = timeValue;

            for (const unitNameElement of unitElement.querySelectorAll(".unitName"))
                unitNameElement.textContent = CountdownHTML.UNIT_PLURALITY_FORMS[className][(timeValue == 1) ? "nonPlural" : "plural"];
        
        }
    }


    /**
     * Update all units of a countdown element.
     */
    updateAllUnits() {
        var TimeCalendarDifference = this.end.subtract(new TimeCalendar());
        this.updateUnit("countdownUnitDays", TimeCalendarDifference.getDate());
        this.updateUnit("countdownUnitHours", TimeCalendarDifference.getHours());
        this.updateUnit("countdownUnitMinutes", TimeCalendarDifference.getMinutes());
        this.updateUnit("countdownUnitSeconds", TimeCalendarDifference.getSeconds());
        this.updateUnit("countdownUnitMilliseconds", TimeCalendarDifference.getMilliseconds());

        // Calculate school days
        // 'School days' increment at midnight, and
        // 'Days' increment at the time set at the 'this.end' TimeCalendar

        var schoolDayDifference = 0;
        var chronoIterator = new Calendar();

        while (chronoIterator.lessThan(new Calendar(this.end))) {
            if (Databases.getDay(new Calendar(chronoIterator)).id != "None")
                schoolDayDifference++;
            chronoIterator.incrementDate(1);
        }
        
        this.updateUnit("countdownUnitSchoolDays", schoolDayDifference);
    }


    startUpdateLoop() {
        super.startUpdateLoop(this.#runUpdateLoop, 1000);
        return true;
    }


    /**
     * The update loop.
     */
    #runUpdateLoop() {
        this.updateAllUnits();
        if (this.end.subtract(new TimeCalendar()).isZero())
            this.stopUpdateLoop();
    }


    stopUpdateLoop() {
        super.stopUpdateLoop();
        this.countdownFinish();
    }


    /**
     * The function to excecute when the loop is stopped.
     */
    countdownFinish() {
        this.countdownHTML.style.background = this.finishColor;
    }

}
