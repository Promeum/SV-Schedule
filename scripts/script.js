// TODO: put in a 'weekly forecast' for upcoming schedules that you can click on to
// access those schedules, add a clock showing hrs, mins, & secs, change the live
// updating progress bar to a CSS animation instead of a JS animation, make the
// progress bars empty if it is the weekend

/**
 * For index.html
 */
function initializeMainSchedule() {  
  switchSchedule();
  updateSchedule();

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      updateSchedule();
    }
  });
}

/**
 * For full-schedule-list.html
 */
function initializeFullScheduleList() {
  // first, duplicate a bunch of tables (so there is 11 in total)
  var tableToClone = document.getElementsByClassName("tableWrapper")[0].cloneNode(true);
  const SCHEDULES_DISPLAYED = 9;

  for (var i=1; i<=SCHEDULES_DISPLAYED; i++) {
    document.getElementsByClassName("tableWrapper")[0].after(tableToClone);
    tableToClone = document.getElementsByClassName("tableWrapper")[0].cloneNode(true);
  }

  // now initialize all the created tables
  var tableList = document.getElementsByTagName("table");
  var scheduleDB = getScheduleDatabase();

  for (var i=0; i<tableList.length; i++) {
    var table = tableList[i];
    var scheduleObject = scheduleDB[Object.keys(scheduleDB)[i]];
    switchSchedule([Object.keys(scheduleDB)[i], scheduleObject.alias], table, false);
    updateSchedule(scheduleObject, table);
    }
  
  document.addEventListener("visibilitychange", () => { // update every single schedule when page is reopened
    if (!document.hidden) {
      var tableList = document.getElementsByTagName("table");
      var scheduleDB = getScheduleDatabase();

      for (var i=0; i<tableList.length; i++) {
        var table = tableList[i];
        var scheduleObject = scheduleDB[Object.keys(scheduleDB)[i]];
        switchSchedule([Object.keys(scheduleDB)[i], scheduleObject.alias], table, false);
        updateSchedule(scheduleObject, table);
      }
    }
  });
}

/**
 * For future-schedules.html
 */
function initializeFutureSchedules() {
  buildCalendar();
}

/**
 * Runs when page is loaded
 */
function initialize() {
  // scroll snap thing
  window.addEventListener("resize", function(e) {
    if (checkOverflowY(document.getElementsByTagName("html")[0])) {
      window.addEventListener("scroll", function(e) { // scroll if user not past title bar
        document.documentElement.style.scrollSnapType = window.scrollY < 40 ? "y mandatory" : "none";
      });
    } else {
      this.window.removeEventListener("resize", function(e){});
      document.documentElement.style.scrollSnapType = "none";
    }
  });

  window.dispatchEvent(new Event("resize"), false, false, true);

  // center the navbar
  var nav = document.getElementById("mainNav");
  nav.scrollTo({
    left: ((nav.scrollWidth-nav.clientWidth)/2)
  });
  
  // scroll the tableWrappers so it is not weird
  var wrappers = document.getElementsByClassName("tableWrapper");
  for (var i=0; i<wrappers.length; i++) {
    var wrapper = wrappers[i];
    var table = wrapper.getElementsByTagName("table")[0];
    wrapper.scrollTo({
      left: ( 2+Math.min(parseInt(getComputedStyle(table).paddingLeft.replace("px",""))+parseInt(getComputedStyle(table).borderLeftWidth.replace("px","")), (wrapper.scrollWidth-wrapper.clientWidth)/2) )
    });
  }

  console.log("init finished");
}

var updateScheduleTimeouts = [];

/**
 * Determines if the passed element is overflowing its bounds vertically.
 * @param {HTMLElement} el An HTMLElement.
 */
function checkOverflowY(el) {
  return el.clientHeight < el.scrollHeight;
}

/**
 * 
 * @param {Number} thisPd 
 * @param {*} scheduleObject 
 * @param {HTMLTableElement} scheduleTable 
 */
function updateProgressBar(thisPd, scheduleObject, scheduleTable) {
  var progBar = scheduleTable.rows[thisPd].getElementsByTagName("progress")[0];
  if (progBar.value >= progBar.max) { // stop and updateSchedule
    updateSchedule(scheduleObject, scheduleTable);
    console.log("finished updating "+scheduleObject.alias);
  } else {
    progBar.value++;

    updateScheduleTimeouts.forEach((value) => clearTimeout(value));
    updateScheduleTimeouts.length = 0;
    updateScheduleTimeouts.push(setTimeout(updateProgressBar, 1000, thisPd, scheduleObject, scheduleTable));
  }
}

/**
 * Highlights the row on the dynamic schedule correspondent with the current time
 */
function updateSchedule(scheduleObject = getSchedule(getTodaysCalendar()[0]), scheduleTable = document.getElementsByTagName("table")[0]) {
  var now = new Date();
  function color(row, color, primary, secondary, progressLevel) {
    row.style["background-color"] = color;
    row.getElementsByTagName("progress")[0].style["background-color"] = primary;
    row.getElementsByTagName("progress")[0].style["foreground-color"] = secondary;
    row.getElementsByTagName("progress")[0].value = progressLevel;
  }

  // set highlight (background color) & progress bar status on each row
  var rows = scheduleTable.rows;
  var timetable = Object.values(scheduleObject.periods);
  var currentPeriodReached = false;
  var currentTime = (now.getHours() * 60) + now.getMinutes() + (now.getSeconds()/60); // in minutes
  
  for (var i=1; i<rows.length; i++) {
    let row = rows[i];
    let startTime = timetable[i-1][0];
      startTime = (Math.floor(startTime / 100) * 60) + (startTime % 100); // in minutes
    let endTime = timetable[i-1][1];
      endTime = (Math.floor(endTime / 100) * 60) + (endTime % 100); // in minutes
    
    color(row, '#ffffff', '#d9d9d9', '#d9d9d9', (Math.floor(timetable[i-1][2]/100)*3600)+(timetable[i-1][2]%100)*60); // assume period has ended
    if ( currentTime < endTime && (now.getDay() != 0 && now.getDay() != 6)) {
      if (currentTime >= startTime) { // this is the current period, set background to yellow and fill in progress bar
        color(row, '#ffd966', '#666666', '#6aa84f', (currentTime - startTime) * 60);
        updateProgressBar(i, scheduleObject, scheduleTable);
        currentPeriodReached = true;
      } else if ((i == 1 && startTime - currentTime <= 30) || (i > 1 && !currentPeriodReached)) { // either transistion between periods, or close to start of 1st pd.
        color(row, '#e3e3e3', '#d9d9d9', '#d9d9d9', 0); // gray out row
        var timeDelay = (startTime - currentTime) * 60 * 1000;
         updateScheduleTimeouts.push(setTimeout(updateSchedule, timeDelay));
        console.log((startTime - currentTime) * 60 * 1000);
        currentPeriodReached = true;
      } else { // period has not started yet
        color(row, '#ffffff', '#d9d9d9', '#d9d9d9', 0);
        currentPeriodReached = true;
      }
    }
  }
}

/**
 * Switches out the schedule in the table for a different one, depending on settings within the document
 */
function switchSchedule(calendarResults = getTodaysCalendar(), scheduleTable = document.getElementsByTagName("table")[0], displayWeekendDisclaimer = true) {
  var scheduleObject = getSchedule(calendarResults[0]);
  var scheduleAlias = calendarResults[1];

  // console.log(calendarResults[0]+" schedule:");
  // console.log(scheduleObject);
  
  // change schedule header title
  let day = new Date().getDay();

  if ((day == 0 || day == 6) && displayWeekendDisclaimer) {
    scheduleTable.querySelector(".tableTitle").innerHTML = "Monday's Schedule:";
    scheduleTable.querySelector(".tableTitle").appendChild(document.createElement('br'));
    scheduleTable.querySelector(".tableTitle").appendChild(document.createTextNode(scheduleAlias));
  } else {
    scheduleTable.querySelector(".tableTitle").innerHTML = scheduleAlias;
  }

  // add/remove rows if necessary
  let diff = Object.keys(scheduleObject.periods).length - (scheduleTable.rows.length-1);
  switch (Math.sign(diff)) {
    case 1: {for (var i=0; i<diff; i++) {scheduleTable.tBodies[0].appendChild(scheduleTable.rows[1].cloneNode(true));} break;}
    case -1: {table.tBodies[0].removeRow(table.getNumRows()+diff); break;}
    case 0: default: {break;}
  }

  // set the text/progress bar for all of the rows
  Object.keys(scheduleObject.periods).forEach(
    function(key,i) {
      scheduleTable.rows[i+1].cells[0].innerHTML = key;
      scheduleTable.rows[i+1].cells[1].innerHTML = scheduleObject.periods[key].reduce((p,c,i) => {c=(c>=1300)?c%1200:c; return (i<2)?p+c.toString().substring(0,c.toString().length-2)+":"+c.toString().substring(c.toString().length-2)+((i==0)?" - ":" "):((c/100)>=1)?p+"("+c.toString().substring(0,c.toString().length-2)+":"+c.toString().substring(c.toString().length-2)+")":p+"("+c+")";},"");
      scheduleTable.rows[i+1].cells[2].getElementsByTagName("progress")[0].value = 0;
      scheduleTable.rows[i+1].cells[2].getElementsByTagName("progress")[0].max = (Math.floor(scheduleObject.periods[key][2]/100)*3600)+(scheduleObject.periods[key][2]%100)*60;
      }
  );
}

var selectedMonth = new Date().getMonth();
var selectedYear = new Date().getFullYear();

function prevMonth() {
  if (selectedMonth == 0) {
    selectedMonth = 12;
    selectedYear--;
  }
  buildCalendar(undefined, --selectedMonth, selectedYear);
  // todo: document.getElementById("monthSelect") returns the option selected, BAD!
  // document.getElementById("monthSelect")[0].children[selectedMonth>=7 ? selectedMonth-7 : selectedMonth+5].selected = true;
  onSelect();
}

function nextMonth() {
  if (selectedMonth == 11) {
    selectedMonth = -1;
    selectedYear++;
  }
  buildCalendar(undefined, ++selectedMonth, selectedYear);
  // document.getElementById("monthSelect")[0].children[selectedMonth>=7 ? selectedMonth-7 : selectedMonth+5].selected = true;
  onSelect();
}

function monthSelect() {
  selectedMonth = document.getElementById("monthSelect").value;
  selectedYear = (selectedMonth<6)? 2025 : 2024;
  buildCalendar(undefined, selectedMonth, selectedYear);
  onSelect();
}

function onSelect() {
  document.getElementById("prevMonth").disabled = (selectedMonth == 7);
  document.getElementById("nextMonth").disabled = (selectedMonth == 5);
}

/**
 * build the calendar with a script so that it will stand the test of time
 * @param {HTMLElement} [calendarTable] The table to be set up
 * @param {number} [month=new Date().getMonth()] The month that should be built
 * @param {number} [year=new Date().getFullYear()] The year in which this month is set
 */
function buildCalendar(calendarTable = document.getElementsByClassName("calendarTable")[0], month = new Date().getMonth(), year = new Date().getFullYear()) {
  const now = new Date();
  var lastDayOfMonth = new Date(year, month+1, 0); // last day of month
  var firstDayOfMonth = new Date(lastDayOfMonth);
    firstDayOfMonth.setDate(1);
  var lastDayOfLastMonth = new Date(year, firstDayOfMonth.getMonth(), 0).getDate();
  var daysInMonth = lastDayOfMonth.getDate();
  
  var offset = firstDayOfMonth.getDay(); // the weekday the month starts
  var weekCount = Math.floor((daysInMonth-1+offset)/7+1); // the number of rows there should be in this month (excluding the row for the week names)
  
  if (selectedMonth == null)
    selectedMonth = month;
  if (selectedYear == null)
    selectedYear = year;

  // set table title
  calendarTable.getElementsByClassName("tableTitle")[0].innerHTML = new Intl.DateTimeFormat("en-US", {month: "long"}).format(new Date(year, month));

  // add/remove rows if necessary
  for (var i=1; i<weekCount; i++) {
    calendarTable.tBodies[0].appendChild(calendarTable.tBodies[0].rows[1].cloneNode(true));
  }
  let diff = weekCount - (calendarTable.tBodies[0].rows.length-1);
  switch (Math.sign(diff)) {
    case 1: {for (var i=0; i<diff; i++) {calendarTable.tBodies[0].appendChild(scheduleTable.rows[1].cloneNode(true));} break;}
    case -1: {for (var i=0; i<Math.abs(diff); i++) {calendarTable.tBodies[0].removeChild(calendarTable.tBodies[0].children[1])}; break;}
    case 0: default: {break;}
  }

  // execute for each cell in table
  for (var i=1; i<=(calendarTable.tBodies[0].rows.length - 1) * 7; i++) {
    var row = Math.floor((i-1)/7+1);
    var cell = Math.floor((i-1)%7);
    var cellHTML = calendarTable.tBodies[0].rows[row].cells[cell];
    
    // clear table text
    var temp = cellHTML.children.length-1;
    for (var o=0; o<temp; o++) {
      cellHTML.removeChild(cellHTML.children[1]);
    }

    var scheduleName = "";
    var cellDate;

    var dayRGB; // [r, g, b]

    switch (cell) { // set dayRGB
      case 0:
      case 6:
        dayRGB = [220, 220, 220];
        break;
      default:
        dayRGB = [255, 255, 255];
        break;
    }

    // set cellDate
    if (i-1 < offset) { // month didnt start yet
      cellHTML.getElementsByClassName("dayNum")[0].innerHTML = lastDayOfLastMonth - offset + i;
      cellDate = new Date(year, month-1, lastDayOfLastMonth-offset+i);/* console.log(lastDayOfLastMonth-offset+i); */
    } else if (i-offset > daysInMonth) { // month has ended
      cellHTML.getElementsByClassName("dayNum")[0].innerHTML = i - offset - daysInMonth;
      cellDate = new Date(year, month+1, i-offset-daysInMonth);/* console.log(i-offset-daysInMonth); */
    } else { // the month
      cellHTML.getElementsByClassName("dayNum")[0].innerHTML = i - offset;
      cellDate = new Date(year, month, i-offset);/* console.log(i-offset); */
    }
    
    var calendarResults = getCalendar(cellDate);
    scheduleName = calendarResults[1]; // set scheduleName

    // set color based on the schedule
    switch(scheduleName) {
      case "debug":
        dayRGB = [255, 0, 253];
        break;
      case "Pep Rally":
        dayRGB = [212, 179, 212];
        break;
      case "Delayed Opening":
        dayRGB = [249, 177, 140];
        break;
      case "Early Release":
        dayRGB = [255, 242, 152];
        break;
      case "Assembly Schedule":
      case "AM Homeroom":
      case "Morning Testing":
      case "MAP Testing":
      case "MAP-M Testing":
      case "MAP-R Testing":
        dayRGB = [239, 163, 180];
        break;
      case "No School":
      case "Winter Break":
      case "Christmas Eve":
      case "Christmas Day":
      case "New Year's Eve":
      case "New Year's Day":
        dayRGB = [166, 194, 229];
        break;
      case "Eagle Time":
        dayRGB = [255, 245, 230];
        break;
      case "Regular Schedule":
      case "": break;
      default: 
    }
    
    if (i-1 < offset || i-offset > daysInMonth) // month didnt start yet or month has ended
      dayRGB = dayRGB.map(x => x - 56);

    // set color based on if the date is in the past, present, or future
    switch (Math.sign(cellDate - new Date(now.getFullYear(), now.getMonth(), now.getDate()))) {
      case -1: // past, darken the cell
        dayRGB = dayRGB.map(x => x - 56);
        break;
      case 0: // present, make cell yellow
        dayRGB = [255, 217, 102];
        cellHTML.getElementsByClassName("dayNum")[0].innerHTML += "\xa0—\xa0Today";
        break;
      case 1: // future, do nothing
      default: break;
    }

    var dayColor = "#"+dayRGB.map(x => x.toString(16).padStart(2, "0")).join(""); // converted to #hex from [r,g,b]
    cellHTML.style["background-color"] = dayColor; // set the cell's background-color
    
    
    var comment = calendarResults[2];
    console.log(comment+"\nlen: "+calendarResults.length+"\nobj: "+calendarResults);

    var p = document.createElement("p");
    p.appendChild(document.createTextNode(scheduleName));
    cellHTML.appendChild(p);

    if (comment != null) {
      var pComment = document.createElement("p");
      pComment.appendChild(document.createTextNode(comment));
      cellHTML.appendChild(document.createElement("br"));
      cellHTML.appendChild(pComment);
      console.log("pComment");
      console.log(pComment);
    }
  }
}