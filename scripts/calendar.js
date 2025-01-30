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
      cellDate = new Date(year, month-1, lastDayOfLastMonth-offset+i);
    } else if (i-offset > daysInMonth) { // month has ended
      cellHTML.getElementsByClassName("dayNum")[0].innerHTML = i - offset - daysInMonth;
      cellDate = new Date(year, month+1, i-offset-daysInMonth);
    } else { // the month
      cellHTML.getElementsByClassName("dayNum")[0].innerHTML = i - offset;
      cellDate = new Date(year, month, i-offset);
    }
    
    var calendarResults = getCalendar(cellDate);
    scheduleName = calendarResults.scheduleAlias; // set scheduleName

    // set color based on the schedule
    switch(scheduleName) {
      case "debug":
        dayRGB = [255, 0, 253];
        break;
      case "First Day of School":
      case "Last Day of School":
        dayRGB = [132, 232, 180];
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
      case "Report Card Distribution":
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
      case "Spring Break":
      case "Possible Make-up Day":
        dayRGB = [166, 194, 229];
        break;
      case "Eagle Time":
        dayRGB = [255, 245, 230];
        break;
      case "Regular Schedule":
      case "": break;
      default:
        dayRGB = [230, 165, 228];
        break;
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
    
    
    var comment = calendarResults.extraComments;
    console.log("comment: "+comment+"\nvalues: "+calendarResults.values);

    var p = document.createElement("p");
    p.appendChild(document.createTextNode(scheduleName));
    cellHTML.appendChild(p);

    if (comment != null) {
      var pComment = document.createElement("p");
      pComment.className = 'dayDescription'
      pComment.appendChild(document.createTextNode(comment));
      cellHTML.appendChild(document.createElement("br"));
      cellHTML.appendChild(pComment);
      console.log("pComment");
      console.log(pComment);
    }
  }

  // center the calnendar
  var calendarTableWrapper = document.getElementsByClassName("calendarTableWrapper")[0];
  calendarTableWrapper.scrollTo({
    left: ((calendarTableWrapper.scrollWidth - calendarTableWrapper.clientWidth) / 2)
  });
}