import { Calendar } from "./modules/chrono/calendar.js";
import { TimeCalendar } from "./modules/chrono/timecalendar.js";
import { Day } from "./modules/bellSchedule/day/day.js";
import { ScheduleTableHTML } from "./modules/bellSchedule/day/scheduleTableHTML.js";
import { CountdownHTML } from "./modules/until/countdownHTML.js";
import { Databases } from "./databases.js";
import { Initialize } from "./initialize.js";



window.addEventListener('load', function() {
    Initialize.initialize();

    // Handle the ScheduleTableHTML
    const TABLE_ELEMENT = document.querySelector(".scheduleTable");

    var scheduleTable = new ScheduleTableHTML(
        Databases.getDay(),
        // new Day(
        //     new Calendar(),
        //     Databases.scheduleDatabase["debug"],
        //     null,
        //     "testing!!!"
        // ),
        TABLE_ELEMENT
    );

    scheduleTable.constructScheduleTable();
    scheduleTable.startUpdateLoop();

    setInterval(Initialize.updateTabTitle.bind(this, scheduleTable), 1000);
    
    // Handle the CountdownHTML's
    for (const COUNTDOWN_ELEMENT of document.querySelectorAll(".countdownBase")) {
        var countdown = new CountdownHTML(
            new TimeCalendar(
                COUNTDOWN_ELEMENT.querySelector(".countdownUnitContainer").dataset.endDate
            ),
            COUNTDOWN_ELEMENT
        );

        countdown.startUpdateLoop();
    }
});
