import { Calendar } from "./modules/chrono/calendar.js";
import { Databases } from "./databases.js";
import { CalendarTableHTML } from "./modules/calendarTableHTML.js";
import { Initialize } from "./initialize.js";



window.addEventListener('load', function() {
    Initialize.initialize();

	// set up the CalendarTableHTML

	const CALENDAR_ELEMENT = document.querySelector(".calendarTable");

	var calendarTable = new CalendarTableHTML(CALENDAR_ELEMENT);

	// set up the buttons

	// set up the month dropdown
	var monthSelectDropdown = document.querySelector("#monthSelect");

	const monthIteratorEndMonth = new Calendar(Databases.SCHOOL_YEAR_END_CALENDAR.incrementMonth(1)).withDate(0);
	var monthIterator = Databases.SCHOOL_YEAR_START_CALENDAR.withDate(1);

	while (monthIterator.lessThan(monthIteratorEndMonth)) {
		var newOption = document.createElement("option");

		newOption.value = monthIterator.toString();
		newOption.textContent = monthIterator.toLocaleDateString("en-US", { "month": "long" });
		
		monthSelectDropdown.appendChild(newOption);

		monthIterator.incrementMonth(1);
	}

	monthSelectDropdown.addEventListener(
		"change",
		function(event) {
			calendarTable.selectMonth(new Calendar(event.target.value));
		}
	);

	// set up the previous month button
	document.querySelector("#prevMonth").addEventListener(
		"click", 
		calendarTable.prevMonth.bind(calendarTable)
	);

	// set up the next month button
	document.querySelector("#nextMonth").addEventListener(
		"click",
		calendarTable.nextMonth.bind(calendarTable)
	);
    
	// set up calendar
    calendarTable.selectMonth(new Calendar());
	
	// center the calendar
	var calendarTableWrapper = document.getElementsByClassName("calendarTableWrapper")[0];
	calendarTableWrapper.scrollTo({
		left: ((calendarTableWrapper.scrollWidth - calendarTableWrapper.clientWidth) / 2)
	});
	
});