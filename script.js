// TODO: put in a 'weekly forecast' for upcoming schedules that you can click on to
// access those schedules, add a clock showing hrs, mins, & secs, change the live
// updating progress bar to a CSS animation instead of a JS animation, make schedule
// auto update when in between periods, make the progress bars empty if it is the weekend

var todaysSchedule;

/**
 * Runs when page is loaded
 */
function initialize() {
  console.log("init");
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(this.progBarTimer);
    } else {
      updateSchedule();
    }
  });

  switchSchedule();
  updateSchedule();
}

var progBarTimer;

function updateProgressBar(thisPd, minsInPd) {
  var progressLevel = document.getElementsByTagName("table")[0].rows[thisPd].getElementsByTagName("progress")[0].value
  if (progressLevel >= 1) { // stop and updateSchedule
    clearInterval(this.progBarTimer);
    updateSchedule();
  } else {
    document.getElementsByTagName("table")[0].rows[thisPd].getElementsByTagName("progress")[0].value++;
  }
}

/**
 * Highlights the row on the dynamic schedule correspondent with the current time
 */
function updateSchedule() {
  const now = new Date();
  let mainScheduleTable = document.getElementsByTagName("table")[0];
  function color(row, color, primary, secondary, progressLevel) {
    row.style["background-color"] = color;
    row.getElementsByTagName("progress")[0].style["background-color"] = primary;
    row.getElementsByTagName("progress")[0].style["foreground-color"] = secondary;
    row.getElementsByTagName("progress")[0].value = progressLevel;
  }

  // set highlight (background color) & progress bar status on each row
  var rows = mainScheduleTable.rows;
  var timetable = Object.values(todaysSchedule.periods);
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
      if (currentTime > startTime) { // this is the current period, set background to yellow and fill in progress bar
        color(row, '#ffd966', '#666666', '#6aa84f', (currentTime - startTime) * 60);
        this.progBarTimer = setInterval(updateProgressBar, 1000, i, endTime - startTime);
        currentPeriodReached = true;
      } else if ((i == 1 && now.getHours() == Math.floor(startTime/100)) || (i > 1 && !currentPeriodReached)) { // either transistion between periods, or close to start of 1st pd.
        color(row, '#e3e3e3', '#d9d9d9', '#d9d9d9', 0); // gray out row
        currentPeriodReached = true;
      } else if (i != 1) { // period has not started yet
        color(row, '#ffffff', '#d9d9d9', '#d9d9d9', 0);
      }
    }
  }
}

/**
 * Switches out the schedule in the table for a different one, depending on settings within the document
 */
function switchSchedule() {
  var calendarResults = getTodaysCalendar();
  todaysSchedule = getSchedule(calendarResults[0]); // can be manually overriden
  var scheduleAlias = calendarResults[1];

  console.log(calendarResults[0]+" schedule:");
  console.log(todaysSchedule);
  
  // change schedule header title
  let mainScheduleTable = document.getElementsByTagName("table")[0];
  let day = new Date().getDay();

  if (day == 0 || day == 6) {
    document.getElementById("tableTitle").innerHTML = "Monday's Schedule:";
    document.getElementById("tableTitle").appendChild(document.createElement('br'));
    document.getElementById("tableTitle").appendChild(document.createTextNode(scheduleAlias));
  } else {
    document.getElementById("tableTitle").innerHTML = scheduleAlias;
  }

  // add/remove rows if necessary
  let diff = Object.keys(todaysSchedule.periods).length - (mainScheduleTable.rows.length-1);
  switch (Math.sign(diff)) {
    case 1: {for (var i=0; i<diff; i++) {mainScheduleTable.appendChild(mainScheduleTable.rows[1].cloneNode(true));} break;}
    case -1: {table.removeRow(table.getNumRows()+diff); break;}
    case 0: default: {break;}
  }

  // set the text/progress bar for all of the rows
  Object.keys(todaysSchedule.periods).forEach(
    function(key,i) {
      mainScheduleTable.rows[i+1].cells[0].innerHTML = key;
      mainScheduleTable.rows[i+1].cells[1].innerHTML = todaysSchedule.periods[key].reduce((p,c,i) => {c=(c>=1300)?c%1200:c; return (i<2)?p+c.toString().substring(0,c.toString().length-2)+":"+c.toString().substring(c.toString().length-2)+((i==0)?" - ":" "):((c/100)>=1)?p+"("+c.toString().substring(0,c.toString().length-2)+":"+c.toString().substring(c.toString().length-2)+")":p+"("+c+")";},"");
      mainScheduleTable.rows[i+1].cells[2].getElementsByTagName("progress")[0].value = 0;
      mainScheduleTable.rows[i+1].cells[2].getElementsByTagName("progress")[0].max = todaysSchedule.periods[key][2]*60;
      }
  );
}