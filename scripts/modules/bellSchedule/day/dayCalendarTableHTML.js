import { Time } from "../../chrono/time.js";
import { Calendar } from "../../chrono/calendar.js";
import { TimeCalendar } from "../../chrono/timecalendar.js";
import { BellSchedule } from "../bellSchedule.js";
import { Day } from "./day.js";



/**
 * Manages a schedule table HTML element.
 */
export class DayCalendarTableHTML extends Day {

    /**
     * Constructs a CalendarTable day cell.
     * @param {Day} day Take data from a Day
     * @param {HTMLTableCellElement} dayElement The HTML element
     */
    constructor(day, dayElement) {
        super(
            day.date,
            new BellSchedule(day.id, day.defaultAlias, day.defaultColor, day.periods),
            day.alias,
            day.color,
            day.comments,
            day.extraComments
        );

        this.dayElement = dayElement;
    }


    constructDayCell() {
        // background color

        // highlight the background yellow if it is today
        if (this.date.equals(new Calendar()))
            this.color = "rgb(255, 217, 102)";
        this.dayElement.style.backgroundColor = this.color;

        // date number
        this.dayElement.querySelector("p.dayNum").textContent = this.date.getDate();

        // indicate the date number if it is today
        if (this.date.equals(new Calendar()))
            this.dayElement.querySelector("p.dayNum").textContent += " — Today";

        // bell schedule alias
        this.addLine("p", this.alias, "dayAlias");

        // comments
        if (this.comments) {
            var commentLines = this.comments.split("\n");
            for (let i = 0; i < commentLines.length; i++) {
                const line = commentLines[i];

                this.addLine("p", line, "dayDescription");
            }
        }

        // extra comments indicator
        if (this.extraComments)
            this.addLine("p", "+ More...", "dayPopupHint");
    
        // setup tab indexing
        this.dayElement.tabIndex = 0;

        // setup day popup mechanism
        this.dayElement.addEventListener("focus", this.dayPopupFocus.bind(this));
        this.dayElement.addEventListener("blur", this.deleteAllDayPopups.bind(this));

    }


    /**
     * Adds a text-containing element to the dayElement cell.
     * @param {String} tag 
     * @param {String} textContent 
     * @param {String | String[] | undefined} classList 
     * @param {Object | undefined} styleOptions 
     * @returns {HTMLElement}
     */
    addLine(tag, textContent, classList = undefined, styleOptions = undefined) {
        var newElement = document.createElement(tag);

        if (classList) {
            if (classList.constructor.name == "Array")
                newElement.classList.add(...classList);
            else if (classList.constructor.name == "String")
                newElement.classList.add(classList);
            else
                throw new TypeError(`Parameter classList (${classList}) is of type ${classList.constructor.name}`);
        }

        if (styleOptions)
            for (const styleOption in styleOptions) {
                const styleValue = styleOptions[styleOption];

                newElement[styleOption] = styleValue;
            }

        newElement.textContent = textContent;

        this.dayElement.append(newElement);

        return newElement;
    }


    dayPopupFocus() {
            // create popup
            var popup = document.createElement('div');
            popup.className = "dayPopup";

            // set text of popup

            // schedule name
            if (this.alias != "") {
                var boldLine = document.createElement("p");
                boldLine.textContent = this.alias;
                boldLine.style.textAlign = 'center';
                boldLine.style.fontWeight = 'bold';
                boldLine.style.paddingBlockEnd = '0.2em';
                popup.appendChild(boldLine);
            }

            // comments
            if (this.comments)
                for (const line of this.comments.split('\n')) {
                    if (line != 'undefined') {
                        popup.appendChild(document.createTextNode(line));
                        popup.appendChild(document.createElement('br'));
                    }
                }

            // add hr between comments and extraComments
            if (this.comments && this.extraComments) {
                var horizontalRule = document.createElement('hr');
                popup.appendChild(horizontalRule);
            }

            // extraComments
            if (this.extraComments)
                for (const line of this.extraComments.split('\n')) {
                    if (line != 'undefined') {
                        var italicLine = document.createElement('p');
                        italicLine.style.fontStyle = 'italic';
                        italicLine.textContent = line;
                        italicLine.style.paddingBlockEnd = '0.2em';
                        popup.appendChild(italicLine);
                    }
                }

            // if empty
            if (popup.textContent == '')
                popup.textContent = 'Nothing much...';

            this.dayElement.prepend(popup);

            popup.style.marginLeft = (this.dayElement.clientWidth / 2 - popup.offsetWidth / 2 - 3) + "px";

            this.popup = popup;
    }


    deleteAllDayPopups() {
        this.popup.remove();
    }

}