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
      progBarDelay = 1000
    } else {
      progBarDelay = 500
    }
  });
}

/**
 * For full-schedule-list.html
 */
function initializeFullScheduleList() {
  // first, duplicate a bunch of tables
  var tableToClone = document.getElementsByClassName("tableWrapper")[0].cloneNode(true);
  const SCHEDULES_DISPLAYED = 15;

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

    switchSchedule({'scheduleName': Object.keys(scheduleDB)[i], 'scheduleAlias': scheduleObject.alias}, table, false, false);
    updateSchedule(scheduleObject, table);
  }
  
  document.addEventListener("visibilitychange", () => { // update every single schedule when page is reopened
    if (!document.hidden) {
      var tableList = document.getElementsByTagName("table");
      var scheduleDB = getScheduleDatabase();

      for (var i=0; i<tableList.length; i++) {
        var table = tableList[i];
        var scheduleObject = scheduleDB[Object.keys(scheduleDB)[i]];
        switchSchedule({'scheduleName': Object.keys(scheduleDB)[i], 'scheduleAlias': scheduleObject.alias}, table, false, false);
        updateSchedule(scheduleObject, table);
      }
    }
  });
}

/**
 * For future-schedules.html
 * 
 * async used to pause excecution
 * until buildCalendar() is finished
 */
async function initializeFutureSchedules() {
  await buildCalendar();
  // center the calnendar
  var calendarTableWrapper = document.getElementsByClassName("calendarTableWrapper")[0];
  calendarTableWrapper.scrollTo({
    left: ((calendarTableWrapper.scrollWidth - calendarTableWrapper.clientWidth) / 2)
  });
}

/**
 * For this-period.html
 */
function initializePeriodTimer() {
  switchPeriod();
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
  var nav = document.getElementsByClassName("mainNavWithin")[0];
  nav.scrollTo({
    left: ((nav.scrollWidth-nav.clientWidth)/2)
  });
  
  // scroll the tableWrappers so it is not weird
  var wrappers = document.getElementsByClassName("tableWrapper");
  for (var i=0; i<wrappers.length; i++) {
    var wrapper = wrappers[i];
    var table = wrapper.getElementsByTagName("table")[0];
    wrapper.scrollTo({
      left: ( 2
        + Math.min(parseInt(getComputedStyle(table).paddingLeft.replace("px",""))
          + parseInt(getComputedStyle(table).borderLeftWidth.replace("px","")),
        (wrapper.scrollWidth-wrapper.clientWidth) / 2) )
    });
  }

  console.log("init finished");
}

/**
 * Determines if the passed element is overflowing its bounds vertically.
 * @param {HTMLElement} el An HTMLElement.
 */
function checkOverflowY(el) {
  return el.clientHeight < el.scrollHeight;
}
