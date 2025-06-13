/*



	OBSOLETE
	Delete when ready


*/
import { Databases } from './databases.js'
import { Time } from './modules/chrono/time.js';
import { Calendar } from './modules/chrono/calendar.js';
import { TimeCalendar } from './modules/chrono/timecalendar.js';
import { CountdownHTML } from './modules/until/countdownHTML.js';
import { Day } from './modules/bellSchedule/day/day.js';
import { ScheduleTableHTML } from './modules/bellSchedule/day/scheduleTableHTML.js';
// TODO: A 'weekly forecast' for upcoming schedules that you can click on to
// access those schedules, add a clock showing hrs, mins, & secs



// random code

calendarDatabase = {
        "8/26/2024": ["AMHomeroom", "First Day of School"],

        "9/2/2024": ["None", "No School"],
        "9/3/2024": ["SpecialHomeroom1", "Special Homeroom"],
        "9/4/2024": ["SpecialHomeroom1", "Special Homeroom"],
        "9/5/2024": ["SpecialHomeroom1", "Special Homeroom"],
        "9/6/2024": ["SpecialHomeroom1", "Special Homeroom"],

        "9/20/2024": ["PepRally", "Pep Rally"],
        "9/25/2024": ["MAPTesting", "MAP-M Testing"],
        "9/26/2024": ["MAPTesting", "MAP-R Testing"],
        "9/27/2024": ["EarlyRelease", "Early Release"],

        "10/2/2024": ["ECAFair", "Extracurricular Fair"],
        "10/3/2024": ["None", "No School"],
        "10/8/2024": ["EagleTime", "Eagle Time", "IB Group 4 Project"],
        "10/9/2024": ["Regular", "Regular Schedule", "IB Group 4 Project"],
        "10/16/2024": ["PSAT", "PSAT Testing Day"],
        "10/18/2024": ["None", "No School"],
        "10/31/2024": ["EagleTime", "Eagle Time", "Halloween!"],

        "11/4/2024": ["None", "No School"],
        "11/5/2024": ["None", "No School"],
        "11/6/2024": ["EagleTime", "Safety Day"],
        "11/13/2024": ["ReportCardDay", "Report Card Distribution"],

        "11/25/2024": ["EarlyReleaseAlt_1234", "Early Release"],
        "11/26/2024": ["EarlyReleaseAlt_1678", "Early Release"],
        "11/27/2024": ["None", "No School"],
        "11/28/2024": ["None", "No School"],
        "11/29/2024": ["None", "No School"],
        
        "12/4/2024": ["AssemblyAdjusted", "Assembly (Adjusted)"],
        "12/19/2024": ["AssemblyAdjusted2", "Assembly (Adjusted)"],
        "12/20/2024": ["AssemblyAdjusted3", "Winter Concert"],
        "12/23/2024": ["None", "Winter Break"],
        "12/24/2024": ["None", "Christmas Eve"],
        "12/25/2024": ["None", "Christmas Day"],
        "12/26/2024": ["None", "Winter Break"],
        "12/27/2024": ["None", "Winter Break"],
        "12/30/2024": ["None", "Winter Break"],
        "12/31/2024": ["None", "New Year's Eve"],

        "1/1/2025": ["None", "New Year's Day"],
        "1/6/2025": ["None", "Snow Day"],
        "1/7/2025": ["None", "Snow Day"],
        "1/8/2025": ["None", "Snow Day"],
        "1/9/2025": ["DelayedOpening", "Delayed Opening"],
        "1/20/2025": ["None", "Inauguration Day", "Schools and offices closed"],
        "1/21/2025": ["DelayedOpening", "Delayed Opening"],
        "1/22/2025": ["DelayedOpening", "Delayed Opening"],
        "1/27/2025": ["Regular", "Regular Schedule", "MP2 student schedules finalized by 5 pm"],
        "1/28/2025": ["EagleTime", "Eagle Time", "End of MP2 / Semester 1"],
        "1/29/2025": ["None", "No School", "Grading and Planning for Teachers"],
        "1/30/2025": ["AMHomeroom", "AM Homeroom"],
        "1/31/2025": ["Regular", "Regular Schedule", "MP2 Final grades in by 2 pm!"],

        "2/4/2025": ["EagleTime", "Eagle Time", "MP2 Report Cards in Synergy"],
        "2/6/2025": ["SpecialDelayedOpening", "Delayed Opening", "MP2 Report Cards Distributed"],
        "2/12/2025": ["None", "Snow Day"],
        "2/17/2025": ["None", "President's Day", "Schools and offices closed"],
        "2/28/2025": ["EarlyRelease", "Early Release", "MP3 Interims, Final grades in by 5 pm!"],
        
        "3/7/2025": ["Regular", "Regular Schedule", "MP3 Interim Report Cards Mailed"],
        "3/14/2025": ["Regular", "Regular Schedule", "Pi Day!"],
        "3/19/2025": ["PSAT", "PSAT Testing Day", "Mock Exams available for seniors"],
        "3/27/2025": ["EagleTime", "Eagle Time", "MP3 student schedules finalized by 5 pm"],
        "3/28/2025": ["Regular", "Regular Schedule", "End of MP3"],
        "3/31/2025": ["None", "No School", "Grading and Planning for Teachers"],

        "4/1/2025": ["EagleTime", "Eagle Time", "MP3 Grades in!"],
        "4/4/2025": ["Regular", "Regular Schedule", "MP3 Report Cards in Synergy"],
        "4/8/2025": ["ReportCardDayET", "Report Card Distribution", "MP3 Report Cards Distributed"],
        "4/10/2025": ["AssemblyAdjusted", "Health Fair", "Three rotations to be held during 3rd period"],
        "4/11/2025": ["PepRally", "Pep Rally", "\\\"Clash of the Classes\\\"", "Deadline to complete and verify 75 SSL Hours Completed (for Senior Graduation)"],
        "4/14/2025": ["None", "Spring Break"],
        "4/15/2025": ["None", "Spring Break"],
        "4/16/2025": ["None", "Spring Break"],
        "4/17/2025": ["None", "Spring Break"],
        "4/18/2025": ["None", "Spring Break"],
        "4/21/2025": ["None", "Spring Break"],
        "4/29/2025": ["EagleTime", "Eagle Time",
            "Tests for IB Physics, IB SEHS",
            "IB Physics paper 1 (12:00 pm)\\nIB SEHS paper 1 & 3 (12:00 pm)"
        ],
        "4/30/2025": ["Regular", "Regular Schedule",
            "Tests for IB Business, IB Physics, IB SEHS",
            "IB Physics paper 2 (8:00 am)\\nIB SEHS paper 2 (8:00 am)\\nIB Business paper 1 (& 3, HL only) (12:00 pm)"
        ],

        "5/2/2025": ["Regular", "Regular Schedule",
            "Tests for IB Business, IB ESS",
            "IB Business paper 2 (8:00 am)\\nIB ESS paper 1 (12:00 pm)\\nMP4 Interim Grades in for Seniors!"
        ],
            
        "5/5/2025": ["MorningTesting_1234", "MCAP A",
            "Tests for IB ESS, IB History",
            "IB ESS paper 2 (8:00 am)\\nIB History paper 1 & 2 (12:00 pm)\\nMCAP Testing May 5-9 (for Seniors, if not taken yet)"
        ],
        "5/6/2025": ["MorningTesting_1678", "MCAP B",
            "Tests for AP Gov, IB History",
            "IB History paper 3 (8:00 am)\\nAP Gov Test (12:00 pm)\\nMCAP Testing May 5-9 (for Seniors, if not taken yet)"
        ],
        "5/7/2025": ["MorningTesting_1234", "MCAP A",
            "Tests for AP Java, IB Psychology",
            "AP Java Test (12:00 pm)\\nIB Psychology paper 1 (12:00 pm)\\nMCAP Testing May 5-9 (for Seniors, if not taken yet)"
        ],
        "5/8/2025": ["MorningTesting_1678", "MCAP B",
            "Tests for AP African Amer. Studies, IB Psychology, AP Stat, IB Lit., IB Lang. Lit.",
            "AP African American Studies Test (8:00 am)\\nAP Statistics Test (8:00 am)\\nIB Psychology paper 2 (8:00 am)\\nIB Lit. paper 1 (12:00 pm)\\nIB Lang. Lit. paper 1 (12:00 pm)\\nMCAP Testing May 5-9 (for Seniors, if not taken yet)"
        ],
        "5/9/2025": ["MorningTesting_1234", "MCAP A",
            "Tests for APUSH, IB Lit., IB Lang. Lit., IB Geography, IB Soc Cult.",
            "APUSH test (8:00 am)\\nIB Lit. paper 2 (8:00 am)\\nIB Lang. Lit. paper 2 (8:00 am)\\nIB Geography paper 1 (12:00 pm)\\nIB Societies and Cultures paper 1 (12:00 pm)\\nInterim Grades In\\nMP4 Interim Report Cards Mailed (Seniors)\\nMCAP Testing May 5-9 (for Seniors, if not taken yet)"
        ],
            
        "5/12/2025": ["SpecialBlockA", "Block A",
            "Tests for IB Biology, AP Calc AB/BC, IB Geography, IB Soc Cult.",
            "AP Calculus AB Test (8:00 am)\\nAP Calculus BC Test (8:00 am)\\nIB Geography paper 2 (8:00 am)\\nIB Societies and Cultures paper 2 (8:00 am)\\nIB Biology paper 1 (12:00 pm)"
        ],
        "5/13/2025": ["SpecialBlockB", "Block B",
            "Tests for IB Biology, IB Economics, AP Precalculus",
            "AP Precalculus Test (8:00 am)\\nIB Biology paper 2 (8:00 am)\\nIB Economics paper 2 (12:00 pm)"
        ],
        "5/14/2025": ["SpecialBlockA", "Block A",
            "Tests for IB Economics, IB Spanish",
            "IB Economics paper 2 (8:00 am)\\nIB Spanish paper 1 & 2 (12:00 pm)"
        ],
        "5/15/2025": ["SpecialBlockB", "Block B",
            "Tests for APCSP, IB Calc, IB Stat, IB Spanish",
            "IB Spanish paper 2 (8:00 am)\\nAPCSP Test (12:00 pm)\\nIB Analysis & Approaches paper 1 (12:00 pm)\\nIB Applications & Interpretations paper 1 (12:00 pm)"
        ],
        "5/16/2025": ["Regular", "Regular Schedule",
            "Tests for IB Chemistry, IB Calc, AP Psychology, IB Stat",
            "IB Analysis & Approaches paper 2 (8:00 am)\\nIB Applications & Interpretations paper 2 (8:00 am)\\nAP Psychology Test (12:00 pm)\\nIB Chemistry paper 1 (12:00 pm)\\nMP4 Interim Report Cards Mailed\\nDeadline For All Classwork (Seniors in Project GRAD Only)"
        ],

        "5/19/2025": ["Regular", "Regular Schedule",
            "Tests for IB Chemistry, IB Global Politics",
            "IB Chemistry paper 2 (8:00 am)\\nIB Global Politics paper 1 (12:00 pm)"
        ],
        "5/20/2025": ["EagleTime", "Eagle Time",
            "Tests for IB French, IB Global Politics",
            "IB Global Politics paper 2 (8:00 am)\\nIB French paper 1 & 2 (12:00 pm)"
        ],
        "5/21/2025": ["Regular", "Regular Schedule",
            "Tests for IB Calc, IB Stat, IB French",
            "IB French paper 2 (8:00 am)\\nIB Analysis & Approaches paper 3 (12:00 pm)\\nIB Applications & Interpretations paper 3 (12:00 pm)"
        ],
        
        "5/23/2025": ["Regular", "Regular Schedule", "Seniors' Last Day", "Deadline for All Classwork (Seniors)"],
        "5/26/2025": ["None", "Memorial Day", "Schools and offices closed"],
        "5/29/2025": ["EagleTime", "Eagle Time", "Graduation Rehearsal @ 7:45 am"],
        "5/30/2025": ["Regular", "Regular Schedule", "Graduation Ceremonies @ UMBC at 2 pm"],

        "6/5/2025": ["ConcertSchedule", "Concert Schedule"],
        "6/6/2025": ["None", "No School", "Staff Professional Day"],
        "6/12/2025": ["EagleTime", "Eagle Time", "MP4 last update to student schedules by 5 pm"],
        "6/13/2025": ["EarlyRelease", "Early Release"],
        "6/16/2025": ["EarlyRelease", "Early Release"],
        "6/17/2025": ["EarlyRelease", "Last Day of School", "Early Release\\nEnd of MP4"],
        "6/18/2025": ["None", "Possible Make-up Day", "MP4 Final grades in by 12 pm!"],
        "6/19/2025": ["None", "No School", "Systemwide Closure — Schools and offices closed"],
        "6/20/2025": ["None", "Possible Make-up Day"],
        "6/23/2025": ["None", "Possible Make-up Day"],
        "6/24/2025": ["", "", "MP4 Report Cards in Synergy"],
        "6/25/2025": ["", "", "MP4 Report Cards Distributed"]
    };

var fullthing = "";

var lastm = "";

for (key in calendarDatabase) {
  var value = calendarDatabase[key];
  // console.log(key, value)
  
  var date = key.split('/');
  var id = value[0];
  var alias = value[1];
  var comments = value[2] ?? null;
  var extraComments = value[3] ?? null;
  var dayRGB = "";
  switch (alias) {
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
			case "MCAP A":
				dayRGB = [176, 230, 232];
				break;
			case "MCAP B":
				dayRGB = [176, 232, 185];
				break;
			case "Block A":
				dayRGB = [170, 224, 255];
				break;
			case "Block B":
				dayRGB = [158, 248, 206];
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
// console.log(`'${lastm}', '${key[0] + (("1234567890".split("").includes(key[1])) ? key[1] : "")}'`)
  if (lastm != date[0]){
    fullthing += '\n\n';
    // console.log(true)
    }

  fullthing += `
        "${key}": {
            "bellScheduleId": "${(id=="") ? "None" : id}",${`${(["EagleTime", "Regular"].includes(id))?"":(`
            "alias": ${(alias==""||alias=="null") ? "null":`"${alias}"`},
            "color": ${(dayRGB)?"\"#" + dayRGB.map(x => x.toString(16).padStart(2, "0")).join("")+"\"":"null"},`)}`}
            "comments": ${(comments==""||comments=="null"||comments==null)?"null":'"'+comments+'"'},
            "extraComments": ${(extraComments==""||extraComments=="null"||extraComments==null)?"null":'"'+extraComments+'"'}
        },`;

  lastm = date[0];
  // console.log("aaaa",date[0])
}

console.log(fullthing)



