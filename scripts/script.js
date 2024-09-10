// TODO: put in a 'weekly forecast' for upcoming schedules that you can click on to
// access those schedules, add a clock showing hrs, mins, & secs, change the live
// updating progress bar to a CSS animation instead of a JS animation, make the
// progress bars empty if it is the weekend

var todaysSchedule;

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

  for (var i=1; i<=9; i++) {
    document.getElementsByClassName("tableWrapper")[0].after(tableToClone);
    tableToClone = document.getElementsByClassName("tableWrapper")[0].cloneNode(true);
  }

  // now initialize all the created tables
  var tableList = document.getElementsByTagName("table");
  var scheduleDB = getScheduleDatabase();

  for (var i=0; i<tableList.length; i++) {
    var table = tableList[i];
    var scheduleObject = scheduleDB[Object.keys(scheduleDB)[i]];
    switchSchedule([Object.keys(scheduleDB)[i], scheduleObject.alias], table);
    updateSchedule(scheduleObject, table);
    }
  
  document.addEventListener("visibilitychange", () => { // update every single schedule when page is reopened
    if (!document.hidden) {
      var tableList = document.getElementsByTagName("table");
      var scheduleDB = getScheduleDatabase();

      for (var i=0; i<tableList.length; i++) {
        var table = tableList[i];
        var scheduleObject = scheduleDB[Object.keys(scheduleDB)[i]];
        switchSchedule([Object.keys(scheduleDB)[i], scheduleObject.alias], table);
        updateSchedule(scheduleObject, table);
      }
    }
  });
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

  console.log("init finished");
}

var updateScheduleTimeouts = [];

/**
 * Determines if the passed element is overflowing its bounds vertically.
 */
function checkOverflowY(el) {
  return el.clientHeight < el.scrollHeight;
}

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
  const now = new Date();
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
    
    color(row, '#ffffff', '#d9d9d9', '#d9d9d9', timetable[i-1][2]*60); // assume period has ended
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
function switchSchedule(calendarResults = getTodaysCalendar(), scheduleTable = document.getElementsByTagName("table")[0]) {
  var scheduleObject = getSchedule(calendarResults[0]);
  var scheduleAlias = calendarResults[1];

  // console.log(calendarResults[0]+" schedule:");
  // console.log(scheduleObject);
  
  // change schedule header title
  let day = new Date().getDay();

  if (day == 0 || day == 6) {
    scheduleTable.querySelector(".tableTitle").innerHTML = "Monday's Schedule:";
    scheduleTable.querySelector(".tableTitle").appendChild(document.createElement('br'));
    scheduleTable.querySelector(".tableTitle").appendChild(document.createTextNode(scheduleAlias));
  } else {
    scheduleTable.querySelector(".tableTitle").innerHTML = scheduleAlias;
  }

  // add/remove rows if necessary
  let diff = Object.keys(scheduleObject.periods).length - (scheduleTable.rows.length-1);
  switch (Math.sign(diff)) {
    case 1: {for (var i=0; i<diff; i++) {scheduleTable.appendChild(scheduleTable.rows[1].cloneNode(true));} break;}
    case -1: {table.removeRow(table.getNumRows()+diff); break;}
    case 0: default: {break;}
  }

  // set the text/progress bar for all of the rows
  Object.keys(scheduleObject.periods).forEach(
    function(key,i) {
      scheduleTable.rows[i+1].cells[0].innerHTML = key;
      scheduleTable.rows[i+1].cells[1].innerHTML = scheduleObject.periods[key].reduce((p,c,i) => {c=(c>=1300)?c%1200:c; return (i<2)?p+c.toString().substring(0,c.toString().length-2)+":"+c.toString().substring(c.toString().length-2)+((i==0)?" - ":" "):((c/100)>=1)?p+"("+c.toString().substring(0,c.toString().length-2)+":"+c.toString().substring(c.toString().length-2)+")":p+"("+c+")";},"");
      scheduleTable.rows[i+1].cells[2].getElementsByTagName("progress")[0].value = 0;
      scheduleTable.rows[i+1].cells[2].getElementsByTagName("progress")[0].max = scheduleObject.periods[key][2]*60;
      }
  );
}