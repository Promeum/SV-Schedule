import { Chrono } from "../../chrono/chrono.js";
import { Time } from "../../chrono/time.js";
import { Calendar } from "../../chrono/calendar.js";
import { TimeCalendar } from "../../chrono/timecalendar.js";
import { Until } from "../../until/until.js";
import { BellSchedule } from "../bellSchedule.js";
import { Day } from "./day.js";
import { PeriodScheduleTableHTML } from "../../until/period/periodScheduleTableHTML.js";



/**
 * Manages a schedule table HTML element.
 */
export class ScheduleTableHTML extends Day {

    _inUpdateLoop = false;


    /**
     * Constructs a ScheduleTable.
     * @param {Day} day Take data from a Day
     * @param {HTMLTableElement} scheduleElement The HTML element
     */
    constructor(day, scheduleElement) {
        super(
            day.date,
            new BellSchedule(day.id, day.defaultAlias, day.defaultColor, day.periods),
            day.alias,
            day.color,
            day.comments,
            day.extraComments
        );

        var convertedPeriods = [];

        for (const period of day.periods)
            convertedPeriods.push(new PeriodScheduleTableHTML(period, null));

        this.periods = convertedPeriods;

        this.tableElement = scheduleElement;
        this.title = day.alias;
        this.subtitle = day.comments;
    }


    /**
     * Construct the schedule table HTML element.
     */
    constructScheduleTable() {
        // Change schedule header title
        var tableTitle = this.tableElement.querySelector(".tableTitle");
        var weekDay = new Calendar().getDay();

        if (weekDay == 0 || weekDay == 6)
            tableTitle.replaceChildren(
                "Monday's Schedule:",
                document.createElement("br"),
                this.title
            );
        else
            tableTitle.replaceChildren(this.title);

        // Change subtitle if applicable
        var tableSubtitle = this.tableElement.querySelector(".flavorContainer");
        
        if (this.subtitle)
            tableSubtitle.textContent = this.subtitle;

        // Initialize rows
        // Note: This works by copying the first row of the schedule table right off the page.
        var tableRowContainer = this.tableElement.querySelector("tbody");
        var tableRow = this.tableElement.querySelector("tbody > tr").cloneNode(true);

        while (tableRowContainer.hasChildNodes())
            tableRowContainer.firstChild.remove();

        for (const period of this.periods) {
            period.periodHTML = tableRow.cloneNode(true);
            period.constructPeriod();
            tableRowContainer.appendChild(period.periodHTML);
        }
    }


    updateScheduleTable() {
        for (const period of this.periods)
            period.updatePeriod();
    }
    
    
    /**
     * 
     * @return {Boolean} Returns true if the update loop was started, and false otherwise.
     */
    startUpdateLoop() {
        if (!this._inUpdateLoop) {
            // this.updateScheduleTable(); // Disabled so the cool rolling effect can work!
            this.#runUpdateLoop(0);
            return true;
        } else {
            this._inUpdateLoop = false;
            return false;
        }
    }


    /**
     * Recursively updates the rows on the ScheduleTableHTML element by
     * calling the update loops on the stored PeriodScheduleTableHTML instances.
     * @param {Number} periodIndex 
     */
    #runUpdateLoop(periodIndex) {
        const period = this.periods[periodIndex];

        if (periodIndex < this.periods.length - 1)
            period.appendLoopStoppedStack(this, this.#runUpdateLoop, periodIndex + 1);

        period.startUpdateLoop();
    }


    stopUpdateLoop() {
        for (const period of this.periods)
            period.stopUpdateLoop();
    }

}
