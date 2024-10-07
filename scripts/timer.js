/**
 * Updates a progress bar
 * @param {string} periodName The name of the period.
 * @param {HTMLProgressElement} progBar The progress bar to be updated.
 * @param {number[]} [timeouts=[]] The list of timeouts currently running, for internal use
 */
function updateTimerProgress(periodName, progBar, timeouts = []) {
    if (progBar.value >= progBar.max) { // stop and updateSchedule
      updateTimer();
      console.log("updated timer");
    } else {
      progBar.value++;

      timeouts.forEach((value) => clearTimeout(value));
      timeouts.length = 0;
      timeouts.push(setTimeout(updateTimerProgress, 1000, periodName, progBar, timeouts));
    }
}

function switchPeriod() {
    const timerTable = document.getElementsByClassName("timerTable")[0];
    console.log("start");
    var currentState = findCurrentPd();
    console.log(currentState);
    console.log("end");
    timerTable.getElementsByClassName("tableTitle")[0].innerHTML = currentState.periodName;

}

function findCurrentPd(scheduleObject = getSchedule(getTodaysCalendar().scheduleName)) {
    var now = new Date();

    var timetable = Object.values(scheduleObject.periods);
    var currentPeriodReached = false;
    var currentTime = (now.getHours() * 60) + now.getMinutes() + (now.getSeconds()/60); // current time in minutes

    for (var i=0; i<timetable.length; i++) {
        let currentPeriod = Object.keys(scheduleObject.periods)[i];
        let startTime = timetable[i][0];
        startTime = (Math.floor(startTime / 100) * 60) + (startTime % 100); // in minutes
        let endTime = timetable[i][1];
        endTime = (Math.floor(endTime / 100) * 60) + (endTime % 100); // in minutes
        
        if (currentTime < endTime && (now.getDay() != 0 && now.getDay() != 6)) {
            if (currentTime >= startTime) { // this is the current period
                currentPeriodReached = true;
                return {
                    'periodName': currentPeriod,
                    'periodIndex': i, 'transition': "during",
                    'timeUntilStateEnd': (endTime - currentTime) * 60 * 1000
                }
            } else if ((i == 0 && startTime - currentTime <= 30) || (i > 0 && !currentPeriodReached)) { // either transistion between periods, or close to start of 1st pd.
                currentPeriodReached = true;
                return {
                    'periodName': currentPeriod,
                    'periodIndex': i,
                    'transition': "before",
                    'timeUntilStateEnd': (startTime - currentTime) * 60 * 1000
                }
            }
        } else if (i == timetable.length-1) { // day is over
            currentPeriodReached = true;
            return {
                'periodName': currentPeriod,
                'periodIndex': i, 'transition': "after"
            }
        }
    }
}