import { Calendar } from "./modules/chrono/calendar.js";
import { Day } from "./modules/bellSchedule/day/day.js";
import { ScheduleTableHTML } from "./modules/bellSchedule/day/scheduleTableHTML.js";
import { Databases } from "./databases.js";
import { Initialize } from "./initialize.js";



/**
 * The total amount of bell schedules to display, taken from Databases.scheduleDatabase.
 * @type {Number}
 */
const SCHEDULES_TO_DISPLAY = 19;


/**
 * All of the ScheduleTableHTML instances created below are stored in this array.
 * @type {ScheduleTableHTML[]}
 */
var scheduleTableHTMLArray = [];


window.addEventListener('load', function() {
    Initialize.initialize();

    scheduleTableHTMLArray.length = 0;

    // first, duplicate the tables
    for (var i = 1; i < SCHEDULES_TO_DISPLAY; i++) {
        var scheduleTableHTMLElement = document.querySelector(".tableWrapper").cloneNode(true);
        document.querySelector(".tableWrapper").after(scheduleTableHTMLElement);
    }

    // then initialize all of the tables
    for (var i = 0; i < SCHEDULES_TO_DISPLAY; i++) {
        const scheduleTableHTMLElement = document.querySelectorAll("table.scheduleTable")[i];

        // this thing needs to go in some list somwhere.
        // Maybe move this function to full-schedule-list.js?
        var scheduleTableHTML = new ScheduleTableHTML(
            new Day(
                new Calendar(),
                Object.values(Databases.scheduleDatabase)[i]
            ),
            scheduleTableHTMLElement
        );

        scheduleTableHTML.constructScheduleTable();
        scheduleTableHTML.startUpdateLoop();

        scheduleTableHTMLArray.push(scheduleTableHTML);

        // update every single schedule when page is reopened
        /*
            Note: This breaks when you navigate to another tab and
            back very quickly. Needs a Promise-based system in
            Until for this setup to work good. Or something.
        */
        // document.addEventListener("visibilitychange", () => {
        //     for (const scheduleTableHTML of scheduleTableHTMLArray) {
        //         if (document.hidden)
        //             scheduleTableHTML.stopUpdateLoop();
        //         else
        //             scheduleTableHTML.startUpdateLoop();
        //         }
        // });
    }
});
