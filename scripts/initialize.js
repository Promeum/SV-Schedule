import { Calendar } from "./modules/chrono/calendar.js";
import { TimeCalendar } from "./modules/chrono/timecalendar.js";
import { Day } from "./modules/bellSchedule/day/day.js";
import { ScheduleTableHTML } from "./modules/bellSchedule/day/scheduleTableHTML.js";
import { CountdownHTML } from "./modules/until/countdownHTML.js";
import { Databases } from "./databases.js";


export class Initialize {

    /**
     * Runs when any page is loaded
     */
    static initialize() {
        // scroll snap thing with the titlebar
        window.addEventListener("resize", function (e) {
            window.addEventListener("scroll", function (e) { // scroll if user not past title bar
                var bottomOfTopNav = document.querySelector("#topNav").getBoundingClientRect().bottom;
                document.documentElement.style.scrollSnapType = (bottomOfTopNav > 0) ? "y mandatory" : "none";
            });
        });

        window.dispatchEvent(new Event("resize"));

        // center the navbar
        var nav = document.getElementsByClassName("mainNavWithin")[0];
        nav.scrollTo({
            left: ((nav.scrollWidth - nav.clientWidth) / 2)
        });

        // scroll the tableWrappers so it is not weird
        var wrappers = document.getElementsByClassName("tableWrapper");

        for (var i = 0; i < wrappers.length; i++) {
            var wrapper = wrappers[i];
            var table = wrapper.children[0];
            wrapper.scrollTo({
                left: (2
                    + Math.min(
                        parseInt(getComputedStyle(table).paddingLeft.replace("px", ""))
                        + parseInt(getComputedStyle(table).borderLeftWidth.replace("px", "")),
                        (wrapper.scrollWidth - wrapper.clientWidth) / 2
                    )
                )
            });
        }

    }


    /**
     * Updates the tab title by displaying the time until the next period/transition
     * of the ScheduleTableHTML, or just the title if there is no upcoming period/transition.
     * @param {ScheduleTableHTML} scheduleTableHTML 
     */
    static updateTabTitle(scheduleTableHTML) {
        var pageTitleHTML = document.querySelector("title");
        var pageTitle;

        if (scheduleTableHTML.inAPeriodOrTransition()) {
            var timeUntilEnd = scheduleTableHTML.currentPeriodOrTransition().timeUntilEnd();
            
            if (timeUntilEnd.getHours() >= 1) {
                pageTitle = timeUntilEnd.getHours();
                pageTitle += ":";
                pageTitle += timeUntilEnd
                    .toLocaleTimeString(
                        undefined,
                        { "minute": "2-digit", "second": "2-digit" }
                    )
                    .toLocaleLowerCase()
                    .substring(0, 5)
                    .trimEnd();
            } else {
                pageTitle = timeUntilEnd
                    .toLocaleTimeString(
                        undefined,
                        { "minute": "numeric", "second": "2-digit" }
                    )
                    .toLocaleLowerCase()
                    .substring(0, 5)
                    .trimEnd();
            }

            pageTitleHTML.textContent = `${pageTitle} - Ultra Super-Premium SV Schedule - Today\'s Schedule`;
        } else
            pageTitleHTML.textContent = `Ultra Super-Premium SV Schedule - Today\'s Schedule`;
    }

}