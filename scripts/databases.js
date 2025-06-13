import { Time } from "./modules/chrono/time.js";
import { Calendar } from "./modules/chrono/calendar.js";
import { TimeCalendar } from "./modules/chrono/timecalendar.js";
import { BellSchedule } from "./modules/bellSchedule/bellSchedule.js";
import { Day } from "./modules/bellSchedule/day/day.js";
import { Period } from "./modules/until/period/period.js";



// ------------------------- Databases -------------------------
export class Databases {

    /**
     * The first day of school for the current school year.
     * @type {Calendar}
     * @constant
     */
    static get SCHOOL_YEAR_START_CALENDAR() {
        return Calendar.Calendar(2024, 7, 26); // Calendar.Calendar(2025, 7, 26);
    }
    
    /**
     * The last day of school for the current school year.
     * @type {Calendar}
     * @constant
     */
    static get SCHOOL_YEAR_END_CALENDAR() {
        return Calendar.Calendar(2025, 5, 17); // Calendar.Calendar(2026, 5, 17);
    }


    /**
     * All schedules available, may add more
     */
    static #scheduleDatabase = {
        "Regular": new BellSchedule(
            "Regular",
            "Regular Schedule",
            "rgb(255, 255, 255)",
            [
                new Period("Period 1", Time.Time(7, 45), Time.Time(8, 36)),
                new Period("Period 2", Time.Time(8, 42), Time.Time(9, 28)),
                new Period("Period 3", Time.Time(9, 34), Time.Time(10, 20)),
                new Period("Period 4", Time.Time(10, 26), Time.Time(11, 12)),
                new Period("Lunch (Pd 5)", Time.Time(11, 12), Time.Time(11, 54), false),
                new Period("Period 6", Time.Time(12, 0), Time.Time(12, 46)),
                new Period("Period 7", Time.Time(12, 52), Time.Time(13, 38)),
                new Period("Period 8", Time.Time(13, 44), Time.Time(14, 30))
            ]
        ),
        "EagleTime": new BellSchedule(
            "EagleTime",
            "Eagle Time",
            "rgb(255, 245, 230)",
            [
                new Period("Period 1", Time.Time(7, 45), Time.Time(8, 30)),
                new Period("Period 2", Time.Time(8, 36), Time.Time(9, 18)),
                new Period("Period 3", Time.Time(9, 24), Time.Time(10, 6)),
                new Period("Eagle Time", Time.Time(10, 6), Time.Time(10, 36), false),
                new Period("Period 4", Time.Time(10, 42), Time.Time(11, 24)),
                new Period("Lunch (Pd 5)", Time.Time(11, 24), Time.Time(12, 6), false),
                new Period("Period 6", Time.Time(12, 12), Time.Time(12, 54)),
                new Period("Period 7", Time.Time(13, 0), Time.Time(13, 42)),
                new Period("Period 8", Time.Time(13, 48), Time.Time(14, 30)),
            ]
        ),
        "EarlyRelease": new BellSchedule(
            "EarlyRelease",
            "Early Release",
            "rgb(255, 242, 152)",
            [
                new Period("Period 1", Time.Time(7, 45), Time.Time(8, 14)),
                new Period("Period 2", Time.Time(8, 20), Time.Time(8, 46)),
                new Period("Period 3", Time.Time(8, 52), Time.Time(9, 18)),
                new Period("Period 4", Time.Time(9, 24), Time.Time(9, 50)),
                new Period("Period 6", Time.Time(9, 56), Time.Time(10, 22)),
                new Period("Period 7", Time.Time(10, 28), Time.Time(10, 54)),
                new Period("Period 8", Time.Time(11, 0), Time.Time(11, 26)),
                new Period("Lunch (Pd 5)", Time.Time(11, 26), Time.Time(12, 0), false),
            ]
        ),
        "EarlyReleaseAlt_1234": new BellSchedule(
            "EarlyReleaseAlt_1234",
            "Early Release (1-2-3-4)",
            "rgb(255, 242, 152)",
            [
                new Period("Period 1", Time.Time(7, 45), Time.Time(8, 17)),
                new Period("Period 2", Time.Time(8, 23), Time.Time(9, 18)),
                new Period("Period 3", Time.Time(9, 24), Time.Time(10, 19)),
                new Period("Period 4", Time.Time(10, 25), Time.Time(11, 20)),
                new Period("Lunch (Pd 5)", Time.Time(11, 20), Time.Time(12, 0), false),
            ]
        ),
        "EarlyReleaseAlt_1678": new BellSchedule(
            "EarlyReleaseAlt_1678",
            "Early Release (1-6-7-8)",
            "rgb(255, 242, 152)",
            [
                new Period("Period 1", Time.Time(7, 45), Time.Time(8, 17)),
                new Period("Period 6", Time.Time(8, 23), Time.Time(9, 18)),
                new Period("Period 7", Time.Time(9, 24), Time.Time(10, 19)),
                new Period("Period 8", Time.Time(10, 25), Time.Time(11, 20)),
                new Period("Lunch (Pd 5)", Time.Time(11, 20), Time.Time(12, 0), false),
            ]
        ),
        "DelayedOpening": new BellSchedule(
            "DelayedOpening",
            "Delayed Opening",
            "rgb(249, 177, 140)",
            [
                new Period("Period 1", Time.Time(9, 45), Time.Time(10, 17)),
                new Period("Period 2", Time.Time(10, 23), Time.Time(10, 52)),
                new Period("Period 3", Time.Time(10, 58), Time.Time(11, 27)),
                new Period("Period 4", Time.Time(11, 33), Time.Time(12, 2)),
                new Period("Lunch (Pd 5)", Time.Time(12, 2), Time.Time(12, 44), false),
                new Period("Period 6", Time.Time(12, 50), Time.Time(13, 19)),
                new Period("Period 7", Time.Time(13, 25), Time.Time(13, 54)),
                new Period("Period 8", Time.Time(14, 0), Time.Time(14, 30)),
            ]
        ),
        "Assembly": new BellSchedule(
            "Assembly",
            "Assembly Schedule",
            "rgb(239, 163, 180)",
            [
                new Period("Period 1", Time.Time(7, 45), Time.Time(8, 20)),
                new Period("Period 2", Time.Time(8, 26), Time.Time(9, 1)),
                new Period("A1/Pd 3 & SVTV", Time.Time(9, 7), Time.Time(10, 7)),
                new Period("A2/Pd 3 & SVTV", Time.Time(10, 7), Time.Time(11, 7)),
                new Period("Period 4", Time.Time(11, 13), Time.Time(11, 48)),
                new Period("Lunch (Pd 5)", Time.Time(11, 48), Time.Time(12, 28), false),
                new Period("Period 6", Time.Time(12, 34), Time.Time(13, 9)),
                new Period("Period 7", Time.Time(13, 15), Time.Time(13, 50)),
                new Period("Period 8", Time.Time(13, 56), Time.Time(14, 30)),
            ]
        ),
        "PepRally": new BellSchedule(
            "PepRally",
            "Pep Rally",
            "rgb(212, 179, 212)",
            [
                new Period("Period 1", Time.Time(7, 45), Time.Time(8, 20)),
                new Period("Period 2", Time.Time(8, 26), Time.Time(9, 1)),
                new Period("A1/Pd 3", Time.Time(9, 7), Time.Time(10, 1)),
                // new Period("Transition", Time.Time(10, 1), Time.Time(10, 16), false),
                new Period("A2/Pd 3", Time.Time(10, 16), Time.Time(11, 6)),
                new Period("Lunch (Pd 5)", Time.Time(11, 6), Time.Time(11, 46), false),
                new Period("Period 4", Time.Time(11, 52), Time.Time(12, 27)),
                new Period("Period 6", Time.Time(12, 33), Time.Time(13, 8)),
                new Period("Period 7", Time.Time(13, 14), Time.Time(13, 49)),
                new Period("Period 8", Time.Time(13, 55), Time.Time(14, 30)),
            ]
        ),
        "ConcertSchedule": new BellSchedule(
            "ConcertSchedule",
            "Concert (Jun. 4, 2025)",
            "rgb(212, 179, 212)",
            [
            new Period("Period 1", Time.Time(7, 45), Time.Time(8, 25)),
            new Period("Period 2", Time.Time(8, 31), Time.Time(9, 6)),
            new Period("Period 3", Time.Time(9, 12), Time.Time(9, 47)),
            new Period("Pd 4/Assembly 1", Time.Time(9, 53), Time.Time(10, 53)),
            new Period("Pd 4/Assembly 2", Time.Time(10, 53), Time.Time(11, 53)),
            new Period("Lunch (Pd 5)", Time.Time(11, 53), Time.Time(12, 34)),
            new Period("Period 6", Time.Time(12, 40), Time.Time(13, 10)),
            new Period("Period 7", Time.Time(13, 16), Time.Time(13, 50)),
            new Period("Period 8", Time.Time(13, 56), Time.Time(14, 30)),
            ]
        ),
        "AMHomeroom": new BellSchedule(
            "AMHomeroom",
            "AM Homeroom",
            "rgb(239, 163, 180)",
            [
                new Period("Homeroom", Time.Time(7, 45), Time.Time(7, 58)),
                new Period("Period 1", Time.Time(8, 4), Time.Time(8, 48)),
                new Period("Period 2", Time.Time(8, 54), Time.Time(9, 38)),
                new Period("Period 3", Time.Time(9, 44), Time.Time(10, 28)),
                new Period("Period 4", Time.Time(10, 34), Time.Time(11, 18)),
                new Period("Lunch (Pd 5)", Time.Time(11, 18), Time.Time(12, 0), false),
                new Period("Period 6", Time.Time(12, 6), Time.Time(12, 50)),
                new Period("Period 7", Time.Time(12, 56), Time.Time(13, 40)),
                new Period("Period 8", Time.Time(13, 46), Time.Time(14, 30)),
            ]
        ),
        "MorningTesting_1234": new BellSchedule(
            "MorningTesting_1234",
            "MCAP A\nMorning Testing (1-2-3-4)",
            "rgb(239, 163, 180)",
            [
                new Period("Testing", Time.Time(7, 45), Time.Time(11, 0)),
                new Period("Lunch", Time.Time(11, 0), Time.Time(11, 41), false),
                new Period("Period 1", Time.Time(11, 47), Time.Time(12, 12)),
                new Period("Period 2", Time.Time(12, 18), Time.Time(12, 58)),
                new Period("Period 3", Time.Time(13, 4), Time.Time(13, 44)),
                new Period("Period 4", Time.Time(13, 50), Time.Time(14, 30)),
            ]
        ),
        "MorningTesting_1678": new BellSchedule(
            "MorningTesting_1678",
            "MCAP B\nMorning Testing (1-6-7-8)",
            "rgb(239, 163, 180)",
            [
                new Period("Testing", Time.Time(7, 45), Time.Time(11, 0)),
                new Period("Lunch", Time.Time(11, 0), Time.Time(11, 41), false),
                new Period("Period 1", Time.Time(11, 47), Time.Time(12, 12)),
                new Period("Period 6", Time.Time(12, 18), Time.Time(12, 58)),
                new Period("Period 7", Time.Time(13, 4), Time.Time(13, 44)),
                new Period("Period 8", Time.Time(13, 50), Time.Time(14, 30)),
            ]
        ),
        "PSAT": new BellSchedule(
            "PSAT",
            "PSAT Schedule",
            "rgb(239, 163, 180)",
            [
                new Period("Testing", Time.Time(7, 45), Time.Time(11, 45)),
                new Period("Lunch", Time.Time(11, 45), Time.Time(12, 27), false),
                new Period("Period 6", Time.Time(12, 33), Time.Time(13, 8)),
                new Period("Period 7", Time.Time(13, 14), Time.Time(13, 49)),
                new Period("Period 8", Time.Time(13, 55), Time.Time(14, 30)),
            ]
        ),
        "MAPTesting": new BellSchedule(
            "MAPTesting",
            "MAP Testing",
            "rgb(239, 163, 180)",
            [
                new Period("Testing", Time.Time(7, 45), Time.Time(9, 35)),
                new Period("Period 1", Time.Time(9, 45), Time.Time(10, 17)),
                new Period("Period 2", Time.Time(10, 23), Time.Time(10, 52)),
                new Period("Period 3", Time.Time(10, 58), Time.Time(11, 27)),
                new Period("Period 4", Time.Time(11, 33), Time.Time(12, 2)),
                new Period("Lunch", Time.Time(12, 2), Time.Time(12, 44), false),
                new Period("Period 6", Time.Time(12, 50), Time.Time(13, 19)),
                new Period("Period 7", Time.Time(13, 25), Time.Time(13, 54)),
                new Period("Period 8", Time.Time(14, 0), Time.Time(14, 30)),
            ]
        ),
        "ReportCardDay": new BellSchedule(
            "ReportCardDay",
            "Report Card Day",
            "rgb(239, 163, 180)",
            [
                new Period("Period 1", Time.Time(7, 45), Time.Time(8, 32)),
                new Period("Period 2", Time.Time(8, 38), Time.Time(9, 22)),
                new Period("Period 3", Time.Time(9, 28), Time.Time(10, 12)),
                new Period("HR/Report Card", Time.Time(10, 18), Time.Time(10, 28)),
                new Period("Period 4", Time.Time(10, 34), Time.Time(11, 18)),
                new Period("Lunch (Pd 5)", Time.Time(11, 18), Time.Time(12, 0), false),
                new Period("Period 6", Time.Time(12, 6), Time.Time(12, 50)),
                new Period("Period 7", Time.Time(12, 56), Time.Time(13, 40)),
                new Period("Period 8", Time.Time(13, 46), Time.Time(14, 30)),
            ]
        ),
        "ReportCardDayET": new BellSchedule(
            "ReportCardDayET",
            "Report Card Day\n(Eagle Time)",
            "rgb(239, 163, 180)",
            [
                new Period("Period 1", Time.Time(7, 45), Time.Time(8, 28)),
                new Period("Period 2", Time.Time(8, 34), Time.Time(9, 15)),
                new Period("Period 3", Time.Time(9, 21), Time.Time(10, 2)),
                new Period("Eagle Time", Time.Time(10, 2), Time.Time(10, 26), false),
                new Period("Period 4", Time.Time(10, 32), Time.Time(11, 13)),
                new Period("Lunch (Pd 5)", Time.Time(11, 13), Time.Time(11, 53), false),
                new Period("Period 6", Time.Time(11, 59), Time.Time(12, 40)),
                new Period("Period 7", Time.Time(12, 46), Time.Time(13, 27)),
                new Period("Period 8", Time.Time(13, 33), Time.Time(14, 14)),
                new Period("HR/Report Card", Time.Time(14, 20), Time.Time(14, 30)),
            ]
        ),
        "ECAFair": new BellSchedule(
            "ECAFair",
            "Extracurricular Fair",
            "rgb(239, 163, 180)",
            [
                new Period("Period 1", Time.Time(7, 45), Time.Time(8, 34)),
                new Period("Period 2", Time.Time(8, 40), Time.Time(9, 24)),
                new Period("Period 3", Time.Time(9, 30), Time.Time(10, 14)),
                new Period("Period 4", Time.Time(10, 20), Time.Time(11, 4)),
                new Period("Lunch & ECA Fair", Time.Time(11, 4), Time.Time(11, 58), false),
                new Period("Period 6", Time.Time(12, 4), Time.Time(12, 48)),
                new Period("Period 7", Time.Time(12, 54), Time.Time(13, 38)),
                new Period("Period 8", Time.Time(13, 44), Time.Time(14, 30)),
            ]
        ),
        "SpecialDelayedOpening": new BellSchedule(
            "SpecialDelayedOpening",
            "Delayed Opening",
            "rgb(249, 177, 140)",
            [
                new Period("Period 1", Time.Time(9, 45), Time.Time(10, 15)),
                new Period("Period 2", Time.Time(10, 21), Time.Time(10, 48)),
                new Period("Period 3", Time.Time(10, 54), Time.Time(11, 21)),
                new Period("Homeroom", Time.Time(11, 27), Time.Time(11, 37)),
                new Period("Period 4", Time.Time(11, 43), Time.Time(12, 10)),
                new Period("Lunch (Pd 5)", Time.Time(12, 10), Time.Time(12, 51), false),
                new Period("Period 6", Time.Time(12, 57), Time.Time(13, 24)),
                new Period("Period 7", Time.Time(13, 30), Time.Time(13, 57)),
                new Period("Period 8", Time.Time(14, 3), Time.Time(14, 30)),
            ]
        ),
        "None": new BellSchedule(
            "None",
            "No School",
            "rgb(166, 194, 229)",
            [
                new Period("This Day", Time.Time(0, 0), Time.Time(23, 59)),
            ]
        ),
        "debug": new BellSchedule(
            "debug",
            "debugging",
            "rgb(255, 0, 255)",
            [
                new Period("Period 1", Time.Time(20, 45), Time.Time(21, 15)),
                new Period("Period 2", Time.Time(21, 21), Time.Time(21, 48)),
                new Period("Period 3", Time.Time(21, 54), Time.Time(22, 21)),
                new Period("Homeroom", Time.Time(22, 27), Time.Time(22, 39)),
                new Period("Period 4", Time.Time(22, 43), Time.Time(23, 10)),
            ]
        )
    }


    /** All schedules available, may add more */
    static get scheduleDatabase() {
        return Databases.#scheduleDatabase;
    }


    /**
     * Returns the bell schedule based on the id given.
     * @param {String} scheduleId 
     * @return {BellSchedule}
     */
    static getSchedule(scheduleId) {
        if (Object.keys(Databases.scheduleDatabase).includes(scheduleId))
            return Databases.scheduleDatabase[scheduleId];
        else
            throw new RangeError(`Parameter (${scheduleId}) not a valid bell schedule id.`);
    }


    /**
     * All known special school days in the 2024-2025 school year.
     * Source: https://www.montgomeryschoolsmd.org//siteassets/district/calendar/2024/2024-calendar.pdf
     * Alternate source: https://ww2.montgomeryschoolsmd.org/calendar/index.aspx
     * @type {object}
     */
    static #calendarDatabase = {
        /*
            Available options:
                "bellScheduleId", "alias", "color", "comments", "extraComments"
            Notes:
                - bellScheduleId is required.
                - Colors must be in rgb(r, g, b) format.
                - alias and color will be set to defaults (see getDay() and
                    #scheduleDatabase) if not explicitly defined here.
        */

        // TODO: add all the things in the 2026-2027 school year.

        "6/5/2025": {
            "bellScheduleId": "ConcertSchedule",
            "alias": "Concert Schedule",
            "color": "rgb(230, 165, 228)",
        },
        "6/6/2025": {
            "bellScheduleId": "None",
            "alias": "No School",
            "comments": "Staff Professional Day",
        },

        "6/12/2025": {
            "bellScheduleId": "EagleTime",
            "alias": "Eagle Time",
            "comments": "MP4 last update to student schedules by 5 pm",
        },
        "6/13/2025": {
            "bellScheduleId": "EarlyRelease",
            "alias": "Early Release",
        },

        "6/16/2025": {
            "bellScheduleId": "EarlyRelease",
            "alias": "Early Release",
        },
        "6/17/2025": {
            "bellScheduleId": "EarlyRelease",
            "alias": "Last Day of School",
            "color": "rgb(132, 232, 180)",
            "comments": "Early Release\nEnd of MP4",
        },
        "6/18/2025": {
            "bellScheduleId": "None",
            "alias": "Possible Make-up Day",
            "comments": "MP4 Final grades in by 12 pm!",
        },
        "6/19/2025": {
            "bellScheduleId": "None",
            "alias": "No School",
            "comments": "Systemwide Closure — Schools and offices closed",
        },
        "6/20/2025": {
            "bellScheduleId": "None",
            "alias": "Possible Make-up Day",
        },

        "6/23/2025": {
            "bellScheduleId": "None",
            "alias": "Possible Make-up Day",
        },
        "6/24/2025": {
            "bellScheduleId": "None",
            "alias": "",
            "color": "rgb(255, 255, 255)",
            "comments": "MP4 Report Cards in Synergy",
        },
        "6/25/2025": {
            "bellScheduleId": "None",
            "alias": "",
            "color": "rgb(255, 255, 255)",
            "comments": "MP4 Report Cards Distributed",
        }
    };


    static #definedCalendarDays = [];


    static _initializeDefinedCalendarDays() {
        for (const dayString in Databases.#calendarDatabase) {
            const dayArray = dayString.split("/");
            Databases.#definedCalendarDays.push(
                Calendar.Calendar(dayArray[2], dayArray[0] - 1, dayArray[1])
            );
        }
    }


    /**
     * Returns a Day for the school day given, or today if no Calendar is provided.
     * @param {Calendar} schoolday 
     * @return {Day}
     */
    static getDay(schoolday = new Calendar()) {
        // Handle explicitly defined days
        if (Databases.#definedCalendarDays.find(v => schoolday.equals(v)))
            return Day.Day(schoolday, Databases.#calendarDatabase[schoolday.toString()]);

        // Handle weekends
        switch (schoolday.getDay()) {
            case 0: case 6: // no school on the weekends
                return new Day(
                    schoolday,
                    Databases.getSchedule("None"),
                    "",
                    "rgb(220, 220, 220)"
                );
        }
    
        // Handle days outside of school year
        if (
            schoolday.lessThan(Databases.SCHOOL_YEAR_START_CALENDAR)
            || schoolday.greaterThan(Databases.SCHOOL_YEAR_END_CALENDAR)
        )
            return new Day(
                schoolday,
                Databases.getSchedule("None"),
                "",
                "rgb(255, 255, 255)"
            );
        
        // Otherwise, assume a normal week
        switch (schoolday.getDay()) {
            case 1: case 3: case 5: // Regular on Mondays, Wednesdays, and Fridays
                return new Day(
                    schoolday,
                    Databases.getSchedule("Regular")
                );
            case 2: case 4: // Eagle Time on Tuesdays and Thursdays
                return new Day(
                    schoolday,
                    Databases.getSchedule("EagleTime")
                );
        }

    }


    /**
     * Flavor texts. Currently unused.
     * @type {string[]}
     */
    static #flavorTextDatabase = [
        "Features: Exclusive features only available to select few!",
        "Hello there!",
        "Rate my schedule!",
        "Help I am trapped in the FlavorTe",
        "Wait a minute! Time is of the essence.",
        "Ya like jazz?",
        "👍",
        "🍱",
        "Now with more features!",
        "Refresh this page to generate new flavor text!",
        "Premium Schedule™ Est. 2024",
        "Do you are work!",
        "Updated frequently!",
        "Aahahhahhhhh!!1!1",
        "Something",
        "🏳‍🌈",
        "Hypoallergenic!",
        "This is a dynamic schedule!",
        "\"100% Premium Orange Juice\""
    ];

}


Databases._initializeDefinedCalendarDays();
