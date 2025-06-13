import { Calendar } from "./chrono/calendar.js";
import { Databases } from "../databases.js";
import { DayCalendarTableHTML } from "./bellSchedule/day/dayCalendarTableHTML.js";



/**
 * Manages a calendar table HTML element.
 */
export class CalendarTableHTML {

    /**
     * The year the school year started.
     * @type {Number}
     * @constant
     */
    static get SCHOOL_YEAR_STARTED() {
        return Databases.SCHOOL_YEAR_START_CALENDAR.getFullYear();
    }


    /**
     * Template for a row of the calendar HTML element.
     * @type {HTMLTableRowElement}
     * @constant
     */
    static get TABLE_ROW_TEMPLATE() {
        var tableRowRawTemplate = `
            <tr class="dayCellRow">
                <td>
                    <p class="dayNum">day</p>
                </td>
                <td>
                    <p class="dayNum">day</p>
                </td>
                <td>
                    <p class="dayNum">day</p>
                </td>
                <td>
                    <p class="dayNum">day</p>
                </td>
                <td>
                    <p class="dayNum">day</p>
                </td>
                <td>
                    <p class="dayNum">day</p>
                </td>
                <td>
                    <p class="dayNum">day</p>
                </td>
            </tr>
        `.trim();

        var tableRowTemplate = document.createElement("template");
        tableRowTemplate.innerHTML = tableRowRawTemplate;

        return tableRowTemplate.content.children[0];
    }


    /**
     * The selected month shown on the calendar table.
     * @type {Calendar}
     */
    #selectedMonth;

    /** @param {Calendar} value */
    set selectedMonth(value) {
        this.#selectedMonth = new Calendar(value);
        this.#selectedMonth.setDate(1);
    }

    /** @return {Calendar} */
    get selectedMonth() { return new Calendar(this.#selectedMonth); }


    /**
     * The DayCalendarTableHTML instances of the current month.
     * @type {DayCalendarTableHTML[]}
     */
    days = [];
    

    /**
     * @param {HTMLTableElement} calendarElement 
     */
    constructor(calendarElement) {
        this.tableElement = calendarElement;
        this.selectedMonth = new Calendar();
    }


    /**
     * Construct the calendar table HTML element.
     */
    constructCalendarTable() {
        this.days = [];

        // set calendar title
        this.tableElement.querySelector(".tableTitle").textContent = new Intl.DateTimeFormat("en-US", { month: "long" }).format(this.selectedMonth);

        // calculate which days should go in the calendar

        // fetch all the days in this month
        var calendarIterator = new Calendar(this.selectedMonth);
        
        while (calendarIterator.getMonth() === this.selectedMonth.getMonth()) {
            this.days.push(CalendarTableHTML.#calendarToDayHTML(calendarIterator));
            calendarIterator.setDate(calendarIterator.getDate() + 1);
        }

        // and some of the days in last month
        var calendarIterator = this.selectedMonth;

        while (calendarIterator.getDay() > 0) {
            calendarIterator.setDate(calendarIterator.getDate() - 1);
            this.days.unshift(CalendarTableHTML.#calendarToDayHTML(calendarIterator));
        }

        // and some of the days in next month
        var calendarIterator = this.selectedMonth;
        calendarIterator.setMonth(calendarIterator.getMonth() + 1, 0);
        
        while (calendarIterator.getDay() < 6) {
            calendarIterator.setDate(calendarIterator.getDate() + 1);
            this.days.push(CalendarTableHTML.#calendarToDayHTML(calendarIterator));
        }

        // now actually construct the table

        // clear the rows on the actual calendar
        for (const rowToDelete of this.tableElement.querySelectorAll("tr.dayCellRow"))
            rowToDelete.remove();

        // duplicate the weeks as needed
        var tableRows = [];

        // make a new week row
        for (let row = 0; row < Math.ceil(this.days.length / 7); row++) {
            tableRows.push(CalendarTableHTML.TABLE_ROW_TEMPLATE);

            const tableRow = tableRows[row];

            this.tableElement.querySelector("tbody").appendChild(tableRow);

            var daysWithExtraComments = [];

            // construct the days for this week
            for (let cell = row * 7; cell < (row * 7) + 7; cell++) {
                var day = this.days[cell];
                day.dayElement = tableRow.querySelectorAll("td")[cell % 7];

                // darken days in the past and not in the selected month
                var darkenAmount = 0;
                
                if (day.date.lessThan(new Calendar()))
                    darkenAmount += 56;
                if (day.date.getMonth() != this.selectedMonth.getMonth())
                    darkenAmount += 56;

                // parse "rgb(r, g, b)"
                var red = day.color.slice(4, day.color.indexOf(",")) - darkenAmount;
                var green = day.color.slice(day.color.indexOf(",") + 2, day.color.lastIndexOf(",")) - darkenAmount;
                var blue = day.color.slice(day.color.lastIndexOf(",") + 2, day.color.indexOf(")")) - darkenAmount;
                
                day.color = `rgb(${red}, ${green}, ${blue})`;

                day.constructDayCell();

                // get all cells with popup hint text
                if (day.extraComments)
                    daysWithExtraComments.push(day);
            }

            // align the popup hint text to the bottom of their cell for each week

            // set popup hint text position using tallest cell height
            for (const day of daysWithExtraComments) {
                const dayElement = day.dayElement;
                var dayPopupHint = dayElement.querySelector(".dayPopupHint");
                var textRect = dayPopupHint.getBoundingClientRect();
                var parentRect = dayElement.getBoundingClientRect();

                dayPopupHint.style.top = parentRect.bottom - textRect.bottom - 15 + 'px';
            }
        }
    }


    /**
     * Creates a DayCalendarTableHTML instance from a Calendar,
     * without any \<td> cell element attached.
     * @param {Calendar} calendar 
     * @returns 
     */
    static #calendarToDayHTML(calendar) {
        return new DayCalendarTableHTML(
            Databases.getDay(
                new Calendar(calendar)
            ),
            null
        );
    }


    /**
     * Updates the calendar HTML so the previous month is displayed.
     */
    prevMonth() {
        this.selectMonth(
            new Calendar(this.selectedMonth.incrementMonth(-1))
                .withDate(1)
        );
    }


    /**
     * Updates the calendar HTML so the next month is displayed.
     */
    nextMonth() {
        this.selectMonth(
            new Calendar(this.selectedMonth.incrementMonth(1))
                .withDate(1)
        );
    }


    /**
     * Updates the month selector buttons, and also the calendar table HTML.
     * @param {Calendar} newSelectedMonth 
     */
    selectMonth(newSelectedMonth) {
        this.selectedMonth = newSelectedMonth;
        this.constructCalendarTable(this.selectedMonth);

        document.querySelector("#monthSelect").value = this.selectedMonth.toString();

        document.querySelector("#prevMonth").disabled = (
            this.selectedMonth.equals(
                Databases.SCHOOL_YEAR_START_CALENDAR.withDate(1)
            )
        );

        document.querySelector("#nextMonth").disabled = (
            this.selectedMonth.equals(
                Databases.SCHOOL_YEAR_END_CALENDAR.withDate(1)
            )
        );
    }

}
