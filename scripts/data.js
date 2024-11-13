// ------------------------- Databases -------------------------

/**
 * All schedules available, may add more
 * @type {object}
 */
const scheduleDatabase = {
    "Regular": {
        "periods": {
        "Period 1": [745, 836, 51],
        "Period 2": [842, 928, 46],
        "Period 3": [934, 1020, 46],
        "Period 4": [1026, 1112, 46],
        "Lunch (Pd 5)": [1112, 1154, 42],
        "Period 6": [1200, 1246, 46],
        "Period 7": [1252, 1338, 46],
        "Period 8": [1344, 1430, 46]
        },
        "alias": "Regular Schedule"
    },
    "EagleTime": {
        "periods": {
        "Period 1": [745, 830, 45],
        "Period 2": [836, 918, 42],
        "Period 3": [924, 1006, 42],
        "Eagle Time/SVTV": [1006, 1036, 30],
        "Period 4": [1042, 1124, 42],
        "Lunch (Pd 5)": [1124, 1206, 42],
        "Period 6": [1212, 1254, 42],
        "Period 7": [1300, 1342, 42],
        "Period 8": [1348, 1430, 42]
        },
        "alias": "Eagle Time"
    },
    "EarlyRelease": {
        "periods": {
        "Period 1": [745, 814, 29],
        "Period 2": [820, 846, 26],
        "Period 3": [852, 918, 26],
        "Period 4": [924, 950, 26],
        "Period 6": [956, 1022, 26],
        "Period 7": [1028, 1054, 26],
        "Period 8": [1100, 1126, 26],
        "Lunch (Pd 5)": [1126, 1200, 34]
        },
        "alias": "Early Release"
    },
    "DelayedOpening": {
        "periods": {
        "Period 1": [945, 1017, 32],
        "Period 2": [1023, 1052, 29],
        "Period 3": [1058, 1127, 29],
        "Period 4": [1133, 1202, 29],
        "Lunch (Pd 5)": [1202, 1244, 42],
        "Period 6": [1250, 1319, 29],
        "Period 7": [1325, 1354, 29],
        "Period 8": [1400, 1430, 30]
        },
        "alias": "Delayed Opening"
    },
    "Assembly": {
        "periods": {
        "Period 1": [745, 820, 35],
        "Period 2": [826, 901, 35],
        "A1/Pd 3 & SVTV": [907, 1007, 60],
        "A2/Pd 3 & SVTV": [1007, 1107, 60],
        "Period 4": [1113, 1148, 35],
        "Lunch (Pd 5)": [1148, 1228, 40],
        "Period 6": [1234, 1309, 35],
        "Period 7": [1315, 1350, 35],
        "Period 8": [1356, 1430, 35]
        },
        "alias": "Assembly Schedule"
    },
    "PepRally": {
        "periods": {
        "Period 1 & PA": [745, 825, 40],
        "Period 2": [831, 908, 37],
        "Period 3": [914, 951, 37],
        "Period 4": [957, 1034, 37],
        "Lunch (Pd 5)": [1034, 1118, 40],
        "Period 6": [1124, 1201, 37],
        "Period 7": [1207, 1244, 37],
        "Period 8": [1250, 1327, 37],
        "Pep Rally": [1327, 1430, 63]
        },
        "alias": "Pep Rally"
    },
    "AMHomeroom": {
        "periods": {
        "Homeroom & PA": [745, 748, 13],
        "Period 1": [804, 848, 44],
        "Period 2": [854, 938, 44],
        "Period 3": [944, 1028, 44],
        "Period 4": [1034, 1118, 44],
        "Lunch (Pd 5)": [1118, 1200, 42],
        "Period 6": [1206, 1250, 44],
        "Period 7": [1256, 1340, 44],
        "Period 8": [1346, 1430, 44]
        },
        "alias": "AM Homeroom"
    },
    "MorningTesting_1234": {
        "periods": {
        "Testing": [745, 1100, 315],
        "Lunch": [1100, 1141, 41],
        "Period 1": [1147, 1212, 25],
        "Period 2": [1218, 1258, 40],
        "Period 3": [1304, 1344, 40],
        "Period 4": [1350, 1430, 40]
        },
        "alias": "Morning Testing (1-2-3-4)"
    },
    "MorningTesting_1678": {
        "periods": {
        "Testing": [745, 1100, 315],
        "Lunch": [1100, 1141, 41],
        "Period 1": [1147, 1212, 25],
        "Period 6": [1218, 1258, 40],
        "Period 7": [1304, 1344, 40],
        "Period 8": [1350, 1430, 40],
        },
        "alias": "Morning Testing (1-6-7-8)"
    },
    "PSAT": {
        "periods": {
        "Testing": [745, 1145, 400],
        "Lunch": [1145, 1227, 42],
        "Period 6": [1233, 1308, 35],
        "Period 7": [1314, 1349, 35],
        "Period 8": [1355, 1430, 35],
        },
        "alias": "PSAT Schedule"
    },
    "MAPTesting": {
        "periods": {
        "Testing": [745, 935, 150],
        "Period 1": [945, 1017, 32],
        "Period 2": [1023, 1052, 29],
        "Period 3": [1058, 1127, 29],
        "Period 4": [1133, 1202, 29],
        "Lunch": [1202, 1244, 42],
        "Period 6": [1250, 1319, 29],
        "Period 7": [1325, 1354, 29],
        "Period 8": [1400, 1430, 29]
        },
        "alias": "MAP Testing"
    },
    "SpecialHomeroom1": {
        "periods": {
        "Period 1": [745, 824, 39],
        "Period 2": [830, 909, 44],
        "Homeroom (Or Assembly)": [915, 1003, 48],
        "Period 3": [1009, 1048, 39],
        "Period 4": [1054, 1133, 39],
        "Lunch (Pd 5)": [1133, 1218, 45],
        "Period 6": [1224, 1303, 39],
        "Period 7": [1309, 1345, 39],
        "Period 8": [1351, 1430, 39]
        },
        "alias": "Special Homeroom"
    },
    "ReportCardDay": {
        "periods": {
        "Period 1 & PA": [745, 832, 47],
        "Period 2": [838, 922, 42],
        "Period 3": [928, 1012, 44],
        "HR/Report Card": [1018, 1028, 10],
        "Period 4": [1034, 1118, 44],
        "Lunch (Pd 5)": [1118, 1200, 42],
        "Period 6": [1206, 1250, 44],
        "Period 7": [1256, 1340, 44],
        "Period 8": [1346, 1430, 44]
        },
        "alias": "Eagle Time"
    },
    "ECAFair": {
        "periods": {
        "Period 1 & PA": [745, 834, 49],
        "Period 2": [840, 924, 44],
        "Period 3": [930, 1014, 44],
        "Period 4": [1020, 1104, 44],
        "Lunch & ECA Fair": [1104, 1158, 54],
        "Period 6": [1204, 1248, 44],
        "Period 7": [1254, 1338, 44],
        "Period 8": [1344, 1430, 44]
        },
        "alias": "Extracurricular Fair"
    },
    "None": {
        "periods": {
            "This Day": [0, 2400, 2400]
        },
        "alias": "No School"
    },
    "debug": {
        "periods": {
        "1 kgyuv": [1714, 1715, 1],
        "2 vgjhb": [1716, 1717, 1],
        // "3 iugbh": [1701, 1702, 1],
        // "4 oiukj": [1703, 1704, 1],
        // "5 dyugi": [1705, 1706, 1]
        },
        "alias": "debug"
    }
}

/**
 * All known special school days in the 2024-2025 school year.
 * Source: https://www.montgomeryschoolsmd.org//siteassets/district/calendar/2024/2024-calendar.pdf
 * @type {object}
 */
const calendarDatabase = {
    '8/26/2024': ['AMHomeroom', 'First Day of School'],

    '9/2/2024': ['None', 'No School'],
    '9/3/2024': ['SpecialHomeroom1', 'Special Homeroom'],
    '9/4/2024': ['SpecialHomeroom1', 'Special Homeroom'],
    '9/5/2024': ['SpecialHomeroom1', 'Special Homeroom'],
    '9/6/2024': ['SpecialHomeroom1', 'Special Homeroom'],

    '9/20/2024': ['PepRally', 'Pep Rally'],
    '9/25/2024': ['MAPTesting', 'MAP-M Testing'],
    '9/26/2024': ['MAPTesting', 'MAP-R Testing'],
    '9/27/2024': ['EarlyRelease', 'Early Release'],

    '10/2/2024': ['ECAFair', 'Extracurricular Fair'],
    '10/3/2024': ['None', 'No School'],
    // '10/4/2024': ['debug', 'Debugging...'],
    '10/8/2024': ['EagleTime', 'Eagle Time', 'IB Group 4 Project'],
    '10/9/2024': ['Regular', 'Regular Schedule', 'IB Group 4 Project'],
    '10/16/2024': ['PSAT', 'PSAT Schedule'],
    '10/18/2024': ['None', 'No School'],
    '10/31/2024': ['EagleTime', 'Eagle Time', 'Halloween!'],

    '11/4/2024': ['None', 'No School'],
    '11/5/2024': ['None', 'No School'],
    '11/6/2024': ['EagleTime', 'Safety Day'],
    '11/13/2024': ['ReportCardDay', 'Report Card Distribution'],

    '11/25/2024': ['EarlyRelease', 'Early Release'],
    '11/26/2024': ['EarlyRelease', 'Early Release'],
    '11/27/2024': ['None', 'No School'],
    '11/28/2024': ['None', 'No School'],
    '11/29/2024': ['None', 'No School'],
    
    '12/23/2024': ['None', 'Winter Break'],
    '12/24/2024': ['None', 'Christmas Eve'],
    '12/25/2024': ['None', 'Christmas Day'],
    '12/26/2024': ['None', 'Winter Break'],
    '12/27/2024': ['None', 'Winter Break'],
    '12/30/2024': ['None', 'Winter Break'],
    '12/31/2024': ['None', 'New Year\'s Eve'],

    '1/1/2025': ['None', 'New Year\'s Day'],
    '1/20/2025': ['None', 'No School'],
    '1/29/2025': ['None', 'No School'],

    '2/17/2025': ['None', 'No School'],
    '2/28/2025': ['EarlyRelease', 'Early Release'],
    
    '3/31/2025': ['None', 'No School'],

    '4/14/2025': ['None', 'Spring Break'],
    '4/15/2025': ['None', 'Spring Break'],
    '4/16/2025': ['None', 'Spring Break'],
    '4/17/2025': ['None', 'Spring Break'],
    '4/18/2025': ['None', 'Spring Break'],
    '4/21/2025': ['None', 'Spring Break'],

    '5/26/2025': ['None', 'Memorial Day'],

    '6/6/2025': ['None', 'No School'],
    '6/13/2025': ['Early Release', 'Last Day of School'],
    '6/16/2025': ['None', 'No School'],
    '6/17/2025': ['None', 'Possible Make-up Day'],
    '6/18/2025': ['None', 'Possible Make-up Day'],
    '6/19/2025': ['None', 'No School'],
    '6/20/2025': ['None', 'Possible Make-up Day'],
    '6/23/2025': ['None', 'Possible Make-up Day'],
};

/**
 * All flavor texts available, may add more
 * @type {string[]}
 */
const flavorTextDatabase = [
    "Features: Exclusive features only available to select few!",
    "Hello there!",
    "Rate my schedule!",
    "Help I am trapped in the FlavorTe",
    "Wait a minute! Time is of the essence.",
    "Ya like jazz?",
    "👍",
    "🍱",
    "Now with more features!",
    "Refresh this page to generate new flavor text!",
    "Premium Schedule™ Est. 2024",
    "Do you are work!",
    "Updated frequently!",
    "Aahahhahhhhh!!1!1",
    "Something",
    "🏳‍🌈",
    "Hypoallergenic!",
    "This is a dynamic schedule!",
    "\"100% Premium Orange Juice\""
];

// /**
//  * Applies fancy toppings to the flavor text!
//  * @param positions {Array<Number>} Contains the start and end positions of the flavor text within the document.
//  * @param x {Number} The index of the flavor text within flavorTextDatabase.
//  */
// function applyFlavorToppings(positions, x) {
//   let edit = DocumentApp.getActiveDocument().getBody().editAsText();
//   var style = {};
//   switch(x) {
//     case 1: {
//       style[DocumentApp.Attribute.FOREGROUND_COLOR] = '#999999';
//       edit.setAttributes(positions[0]+17, positions[1], style);
//       break;
//     }
//     case 4: {
//       let random = () => r = Math.floor(Math.random()*7)+1;
//       var r = random();
//       style[DocumentApp.Attribute.BOLD] = true;
//       edit.setAttributes(positions[1]-r, positions[1]-r, style);
//       edit.setAttributes(positions[1]-random(), positions[1]-r, style);
//       edit.setAttributes(positions[1]-random(), positions[1]-r, style);
//       let s2 = {};
//       s2[DocumentApp.Attribute.STRIKETHROUGH] = true;
//       edit.setAttributes(positions[1]-random(), positions[1]-r, s2);
//       edit.setAttributes(positions[1]-random(), positions[1]-r, s2);
//       edit.setAttributes(positions[1]-random(), positions[1]-r, s2);
//       let s3 = {};
//       s3[DocumentApp.Attribute.UNDERLINE] = true;
//       edit.setAttributes(positions[1]-random(), positions[1]-r, s3);
//       edit.setAttributes(positions[1]-random(), positions[1]-r, s3);
//       edit.setAttributes(positions[1]-random(), positions[1]-r, s3);
//       break;
//     }
//     case 9: {
//       style[DocumentApp.Attribute.STRIKETHROUGH] = true;
//       edit.setAttributes(positions[0], positions[1]-1, style);
//       break;
//     }
//     default: {
//       style[DocumentApp.Attribute.FOREGROUND_COLOR] = '#0d0d0d';
//       style[DocumentApp.Attribute.BOLD] = false;
//       style[DocumentApp.Attribute.ITALIC] = true;
//       style[DocumentApp.Attribute.UNDERLINE] = false;
//       style[DocumentApp.Attribute.STRIKETHROUGH] = false;
//       edit.setAttributes(positions[0], positions[1], style);
//       break;
//     }
//   }
// }

// ------------------------- Useful Methods -------------------------
/**
 * Cursed, but useful!
 * @param x {String} The string to be converted
 * @returns {RegExp} The string, properly formatted into RegEx
 */
function toRegEx(x) {return x.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');} // pure magic.. why regex

/**
 * Gets an object representing a schedule.
 * @param scheduleName {String} The name of the schedule to be returned.
 * @returns {Object} The schedule to be returned.
 */
function getSchedule(scheduleName) {return scheduleDatabase[scheduleName];}

/**
 * Gets the entire schedule database.
 * @returns {Object} The schedule database.
 */
function getScheduleDatabase() {return scheduleDatabase;}

/**
 * Gets today's schedule, or Monday's schedule if today is the weekend.
 * @returns {Object} scheduleName, scheduleAlias, extraComments, dayRGB.
 *  extraComments can be undefined or a string.
 */
function getTodaysCalendar() {
    const date = new Date();
    switch (date.getDay()) {
      case 6: date.setDate(date.getDate() + 1);
      case 0: date.setDate(date.getDate() + 1);
      default:
    }
    return getCalendar(date);
}

/**
 * Gets the schedule for a specific date.
 * Note: Do not try during summer!
 * @param date {Date} The day to search for.
 * @returns {Object} scheduleName, scheduleAlias, extraComments, dayRGB.
 *  extraComments can be undefined or a string.
 */
function getCalendar(date) {
    const searchDate = new Date(date);

    searchDate.setHours(0, 0, 0, 0); // Abuse Date to make it work. Is Temporal supported yet...
    var scheduleName;
    var scheduleAlias;
    var extraComments;

    // Assume a normal week
    switch (searchDate.getDay()) {
      case 2: case 4: scheduleName = 'EagleTime'; break; // Eagle Time on Tuesdays and Thursdays
      case 0: case 6: // no school on the weekends
        scheduleName = null;
        scheduleAlias = "";
        break;
      default: scheduleName = 'Regular'; break;
    }
    if (scheduleName != null)
        scheduleAlias = getSchedule(scheduleName).alias;

    // Handle summer
    if (searchDate < new Date(2024, 7, 25) || searchDate > new Date(2025, 5, 23)) {
        scheduleName = null;
        scheduleAlias = "";
    }

    // Check the calendar database to see if the date is a special day
    // Override normal week if today is special
    let specialSchedule = calendarDatabase[(searchDate.getMonth()+1) + "/" + searchDate.getDate() + "/" + searchDate.getFullYear()];
    if (specialSchedule != null) {
        console.log("scheduleName: "+specialSchedule[0]+", scheduleAlias: "+specialSchedule[1]+", date to be accessed: "+((searchDate.getMonth()+1) + "/" + searchDate.getDate() + "/" + searchDate.getFullYear()));
        scheduleName = specialSchedule[0];
        scheduleAlias = specialSchedule[1];
        if (specialSchedule.length > 2)
            extraComments = specialSchedule[2];
    }

    var dayRGB = [0,0,0] // placeholder
    
    // return [scheduleName, scheduleAlias, extraComments];
    return {
        'scheduleName': scheduleName,
        'scheduleAlias': scheduleAlias,
        'extraComments': extraComments,
        'dayRGB': dayRGB
    }
}

/**
 * Gets the list of flavor text.
 * @return {string[]} The list of flavor text.
 */
function getFlavorText() {return flavorTextDatabase;}

// Object.keys(obj); -- returns list
// for (var k in obj) {obj[k];} -- returns value
// Object.keys(obj)[2]; -- 3rd key