var updateScheduleTimeouts = [];
var progBarDelay = 1000;
var progBarStartTime = -1;

/**
 * Updates the progress bar in the table and also the page title
 * @param {Number} thisPd 
 * @param {*} scheduleObject 
 * @param {HTMLTableElement} scheduleTable 
 */
function updateProgressBar(thisPd, scheduleObject, scheduleTable) {
    var now = new Date();
    var currentTime = (now.getHours() * 60) + now.getMinutes() + (now.getSeconds()/60); // in minutes
    
    var progBar = scheduleTable.rows[thisPd].getElementsByTagName("progress")[0];
    var title = document.getElementsByTagName("title")[0]
    if (progBar.value >= progBar.max) { // stop and updateSchedule when reached end of period
      updateSchedule(scheduleObject, scheduleTable);
    //   console.log("finished updating "+scheduleObject.alias);
      title.innerHTML = 'Ultra Super-Premium SV Schedule - Today\'s Schedule'
    } else {
      progBar.value = (currentTime - progBarStartTime) * 60;
    //   console.log("start time:\n", progBarStartTime, "\ncurrent time:\n", currentTime, "\ntime elapsed:\n", 60*(currentTime-progBarStartTime), "\nend time:\n", progBarStartTime + progBar.max / 60)
      title.innerHTML = String(Math.floor((progBar.max - progBar.value) / 60))
        + ':' + String(Math.round((progBar.max - progBar.value) % 60)).padStart(2, '0')
        + ' - Ultra Super-Premium SV Schedule - Today\'s Schedule';

      updateScheduleTimeouts.forEach((value) => clearTimeout(value));
      updateScheduleTimeouts.length = 0;
      updateScheduleTimeouts.push(setTimeout(updateProgressBar, progBarDelay, thisPd, scheduleObject, scheduleTable));
    }
}


/**
 * Highlights the row on the dynamic schedule correspondent with the current time
*/
function updateSchedule(scheduleObject = getSchedule(getTodaysCalendar().scheduleName), scheduleTable = document.getElementsByTagName("table")[0]) {
    var now = new Date();

    /**
     * Color one row on the timetable and also set its progress level
     * @param {HTMLTableRowElement} row 
     * @param {String} color 
     * @param {String} primary 
     * @param {String} secondary 
     * @param {Number} progressLevel 
     */
    function color(row, color, primary, secondary, progressLevel) {
        row.style["background-color"] = color;
        row.getElementsByTagName("progress")[0].style["background-color"] = primary;
        row.getElementsByTagName("progress")[0].style["foreground-color"] = secondary;
        row.getElementsByTagName("progress")[0].value = progressLevel;
    }

    var rows = scheduleTable.rows;
    var timetable = Object.values(scheduleObject.periods);
    var currentPeriodReached = false;
    var currentTime = (now.getHours() * 60) + now.getMinutes() + (now.getSeconds()/60); // in minutes

    // set highlight (background color) & progress bar status on each row
    for (var i=1; i<rows.length; i++) {
        let row = rows[i];
        let startTime = timetable[i-1][0];
        startTime = (Math.floor(startTime / 100) * 60) + (startTime % 100); // in minutes
        let endTime = timetable[i-1][1];
        endTime = (Math.floor(endTime / 100) * 60) + (endTime % 100) - 0.5; // in minutes (w/ minus 30 sec. offset, for increased accuracy)
        
        color(row, '#ffffff', '#d9d9d9', '#d9d9d9', (Math.floor(timetable[i-1][2]/100)*3600)+(timetable[i-1][2]%100)*60); // assume period has ended
        if ( currentTime < endTime && (now.getDay() != 0 && now.getDay() != 6)) {
            if (currentTime >= startTime) { // this is the current period, set background to yellow and fill in progress bar
                color(row, '#ffd966', '#666666', '#6aa84f', (currentTime - startTime) * 60);
                progBarStartTime = startTime;
                updateProgressBar(i, scheduleObject, scheduleTable);
                currentPeriodReached = true;
            } else if ((i == 1 && startTime - currentTime <= 30) || (i > 1 && !currentPeriodReached)) { // either transistion between periods, or close to start of 1st pd.
                color(row, '#e3e3e3', '#d9d9d9', '#d9d9d9', 0); // gray out row
                var timeDelay = (startTime - currentTime) * 60 * 1000;
                updateScheduleTimeouts.push(setTimeout(updateSchedule, timeDelay));
                // console.log(Math.round((startTime - currentTime) * 60) + ' seconds until next period start');
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
 * @param {Object} calendarResults scheduleName, scheduleAlias, extraComments, dayRGB
 * @param {HTMLTableElement} scheduleTable 
 * @param {boolean} displayWeekendDisclaimer 
 */
function switchSchedule(calendarResults = getTodaysCalendar(), scheduleTable = document.getElementsByTagName("table")[0], displayWeekendDisclaimer = true, displayDayDescription = true) {
    var scheduleObject = getSchedule(calendarResults.scheduleName);
    var scheduleAlias = calendarResults.scheduleAlias;

    // console.log(calendarResults.scheduleName+" schedule:");
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
            scheduleTable.rows[i + 1].cells[0].innerHTML = key;
            // the below line formats time like this:
            // h:mm - h:mm ([h:]mm)
            // totallyyy baaaasic js!!! optimized for your viewing convenience!!!
            scheduleTable.rows[i + 1].cells[1].innerHTML = scheduleObject.periods[key].reduce(
                (p, c, i) => {
                    c = (c >= 1300 && c < 2400) ? c % 1200
                        : (i != 2 && (c < 100 || c >= 2400)) ? String(c % 1200).padStart(4, '0')
                        : c;
                    return (i < 2) ?
                        p + String(c).substring(0, String(c).length - 2)
                            + ":" + String(c).substring(String(c).length - 2)
                            + ((i == 0) ? " - " : " ")
                        : ((c / 100) >= 1) ?
                            p + "(" + String(c).substring(0, String(c).length - 2)
                            + ":" + String(c).substring(String(c).length - 2) + ")"
                        : p + "(" + String(c).padStart(2, '0') + ")";
                }
            , "");
            scheduleTable.rows[i + 1].cells[2].getElementsByTagName("progress")[0].value = 0;
            scheduleTable.rows[i + 1].cells[2].getElementsByTagName("progress")[0].max = (
                    Math.floor(scheduleObject.periods[key][2] / 100)
                     * 3600
                ) + (scheduleObject.periods[key][2] % 100)
                 * 60
                 - 30; // offset by minus 30 sec. for accuracy
        }
    );
    
    // add day description under title
    if (displayDayDescription) {
        var comment = calendarResults.extraComments;
        // console.log("comment: "+comment+"\nvalues: "+calendarResults.values);

        if (comment != null) {
            var pDescription = scheduleTable.getElementsByClassName("flavorContainer")[0];
            pDescription.textContent = comment
            pDescription.classList.add('scheduleDayDescription')
        }
    }
}
