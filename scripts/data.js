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
        "Eagle Time": [1006, 1036, 30],
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
    "EarlyReleaseAlt_1234": {
        "periods": {
        "Period 1": [745, 817, 32],
        "Period 2": [823, 918, 55],
        "Period 3": [924, 1019, 55],
        "Period 4": [1025, 1120, 55],
        "Lunch (Pd 5)": [1120, 1200, 40]
        },
        "alias": "Early Release"
    },
    "EarlyReleaseAlt_1678": {
        "periods": {
        "Period 1": [745, 817, 32],
        "Period 6": [823, 918, 55],
        "Period 7": [924, 1019, 55],
        "Period 8": [1025, 1120, 55],
        "Lunch (Pd 5)": [1120, 1200, 40]
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
    "AssemblyAdjusted": {
        "periods": {
        "Period 1": [745, 823, 38],
        "Period 2": [829, 907, 38],
        "A1/Pd 3": [913, 943, 30],
        "A2/Pd 3": [949, 1019, 30],
        "A3/Pd 3": [1025, 1055, 30],
        "Lunch (Pd 5)": [1055, 1134, 39],
        "Period 4": [1140, 1218, 38],
        "Period 6": [1224, 1302, 38],
        "Period 7": [1308, 1346, 38],
        "Period 8": [1352, 1430, 38]
        },
        "alias": "Health Fair (Apr. 10)"
    },
    "PepRally": {
        "periods": {
        "Period 1": [745, 820, 35],
        "Period 2": [826, 901, 35],
        "A1/Pd 3": [907, 1001, 54],
        "Transition": [1001, 1016, 15],
        "A2/Pd 3": [1016, 1106, 50],
        "Lunch (Pd 5)": [1106, 1146, 40],
        "Period 4": [1152, 1227, 35],
        "Period 6": [1233, 1308, 35],
        "Period 7": [1314, 1349, 35],
        "Period 8": [1355, 1430, 35],
        },
        "alias": "Pep Rally"
    },
    "AMHomeroom": {
        "periods": {
        "Homeroom": [745, 758, 13],
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
        "Homeroom/Assembly": [915, 1003, 48],
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
        "Period 1": [745, 832, 47],
        "Period 2": [838, 922, 42],
        "Period 3": [928, 1012, 44],
        "HR/Report Card": [1018, 1028, 10],
        "Period 4": [1034, 1118, 44],
        "Lunch (Pd 5)": [1118, 1200, 42],
        "Period 6": [1206, 1250, 44],
        "Period 7": [1256, 1340, 44],
        "Period 8": [1346, 1430, 44]
        },
        "alias": "Report Card Day"
    },
    "ReportCardDayET": {
        "periods": {
        "Period 1": [745, 828, 43],
        "Period 2": [834, 915, 41],
        "Period 3": [921, 1002, 41],
        "Eagle Time": [1002, 1026, 24],
        "Period 4": [1032, 1113, 41],
        "Lunch (Pd 5)": [1113, 1153, 40],
        "Period 6": [1159, 1240, 41],
        "Period 7": [1246, 1327, 41],
        "Period 8": [1333, 1414, 41],
        "HR/Report Card": [1420, 1430, 10]
        },
        "alias": "Report Cards + Eagle Time"
    },
    "AssemblyAdjusted2": {
        "periods": {
        "Period 1": [745, 820, 35],
        "Period 2": [826, 901, 35],
        "A1/Pd 3": [907, 1001, 54],
        "Transition": [1001, 1016, 15],
        "A2/Pd 3": [1016, 1106, 50],
        "Lunch (Pd 5)": [1106, 1146, 40],
        "Period 4": [1152, 1227, 35],
        "Period 6": [1233, 1308, 35],
        "Period 7": [1314, 1349, 35],
        "Period 8": [1355, 1430, 35]
        },
        "alias": "Assembly (Dec. 19)"
    },
    "AssemblyAdjusted3": {
        "periods": {
        "Period 1": [745, 815, 30],
        "Pd 2/Assembly 1": [821, 941, 120],
        "Pd 2/Assembly 2": [947, 1107, 120],
        "Period 3": [1113, 1139, 26],
        "Lunch (Pd 5)": [1139, 1222, 43],
        "Period 4": [1228, 1254, 26],
        "Period 6": [1300, 1326, 26],
        "Period 7": [1332, 1358, 26],
        "Period 8": [1404, 1430, 26]
        },
        "alias": "Assembly (Dec. 20)"
    },
    "ECAFair": {
        "periods": {
        "Period 1": [745, 834, 49],
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
    "SpecialDelayedOpening": {
        "periods": {
        "Period 1": [945, 1015, 30],
        "Period 2": [1021, 1048, 27],
        "Period 3": [1054, 1121, 27],
        "Homeroom": [1127, 1137, 10],
        "Period 4": [1143, 1210, 27],
        "Lunch (Pd 5)": [1210, 1251, 41],
        "Period 6": [1257, 1324, 27],
        "Period 7": [1330, 1357, 27],
        "Period 8": [1403, 1430, 27]
        },
        "alias": "Delayed Opening"
    },
    "None": {
        "periods": {
            "This Day": [0, 2400, 2400]
        },
        "alias": "No School"
    },
    "debug": {
        "periods": {
        "1 kgy6g": [2116, 2118, 2],
        "2 vgjhb": [2121, 2122, 1],
        // "3 iugbh": [2101, 2102, 1],
        // "4 oiukj": [2103, 2104, 1],
        // "5 dyugi": [2105, 2106, 1],
        // "6 e5dyt": [2107, 2108, 1],
        // "7 drtnd": [2109, 2110, 1],
        // "8 xdfmd": [2111, 2112, 1],
        },
        "alias": "debug"
    }
}


/**
 * All known special school days in the 2024-2025 school year.
 * Source: https://www.montgomeryschoolsmd.org//siteassets/district/calendar/2024/2024-calendar.pdf
 * Alternate source: https://ww2.montgomeryschoolsmd.org/calendar/index.aspx
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
    '10/8/2024': ['EagleTime', 'Eagle Time', 'IB Group 4 Project'],
    '10/9/2024': ['Regular', 'Regular Schedule', 'IB Group 4 Project'],
    '10/16/2024': ['PSAT', 'PSAT Testing Day'],
    '10/18/2024': ['None', 'No School'],
    '10/31/2024': ['EagleTime', 'Eagle Time', 'Halloween!'],

    '11/4/2024': ['None', 'No School'],
    '11/5/2024': ['None', 'No School'],
    '11/6/2024': ['EagleTime', 'Safety Day'],
    '11/13/2024': ['ReportCardDay', 'Report Card Distribution'],

    '11/25/2024': ['EarlyReleaseAlt_1234', 'Early Release'],
    '11/26/2024': ['EarlyReleaseAlt_1678', 'Early Release'],
    '11/27/2024': ['None', 'No School'],
    '11/28/2024': ['None', 'No School'],
    '11/29/2024': ['None', 'No School'],
    
    '12/4/2024': ['AssemblyAdjusted', 'Assembly (Adjusted)'],
    '12/19/2024': ['AssemblyAdjusted2', 'Assembly (Adjusted)'],
    '12/20/2024': ['AssemblyAdjusted3', 'Winter Concert'],
    '12/23/2024': ['None', 'Winter Break'],
    '12/24/2024': ['None', 'Christmas Eve'],
    '12/25/2024': ['None', 'Christmas Day'],
    '12/26/2024': ['None', 'Winter Break'],
    '12/27/2024': ['None', 'Winter Break'],
    '12/30/2024': ['None', 'Winter Break'],
    '12/31/2024': ['None', 'New Year\'s Eve'],

    '1/1/2025': ['None', 'New Year\'s Day'],
    '1/6/2025': ['None', 'Snow Day'],
    '1/7/2025': ['None', 'Snow Day'],
    '1/8/2025': ['None', 'Snow Day'],
    '1/9/2025': ['DelayedOpening', 'Delayed Opening'],
    '1/20/2025': ['None', 'Inauguration Day', 'Schools and offices closed'],
    '1/21/2025': ['DelayedOpening', 'Delayed Opening'],
    '1/22/2025': ['DelayedOpening', 'Delayed Opening'],
    '1/27/2025': ['Regular', 'Regular Schedule', 'MP2 student schedules finalized by 5 pm'],
    '1/28/2025': ['EagleTime', 'Eagle Time', 'End of MP2 / Semester 1'],
    '1/29/2025': ['None', 'No School', 'Grading and Planning for Teachers'],
    '1/30/2025': ['AMHomeroom', 'AM Homeroom'],
    '1/31/2025': ['Regular', 'Regular Schedule', 'MP2 Final grades in by 2 pm!'],

    '2/4/2025': ['EagleTime', 'Eagle Time', 'MP2 Report Cards in Synergy'],
    '2/6/2025': ['SpecialDelayedOpening', 'Delayed Opening', 'MP2 Report Cards Distributed'],
    '2/12/2025': ['None', 'Snow Day'],
    '2/17/2025': ['None', 'President\'s Day', 'Schools and offices closed'],
    '2/28/2025': ['EarlyRelease', 'Early Release', 'MP3 Interims, Final grades in by 5 pm!'],
    
    '3/7/2025': ['Regular', 'Regular Schedule', 'MP3 Interim Report Cards Mailed'],
    '3/14/2025': ['Regular', 'Regular Schedule', 'Pi Day!'],
    '3/19/2025': ['PSAT', 'PSAT Testing Day', 'Mock Exams available for seniors'],
    '3/27/2025': ['EagleTime', 'Eagle Time', 'MP3 student schedules finalized by 5 pm'],
    '3/28/2025': ['Regular', 'Regular Schedule', 'End of MP3'],
    '3/31/2025': ['None', 'No School', 'Grading and Planning for Teachers'],

    '4/1/2025': ['EagleTime', 'Eagle Time', 'MP3 Grades in!'],
    '4/4/2025': ['Regular', 'Regular Schedule', 'MP3 Report Cards in Synergy'],
    '4/8/2025': ['ReportCardDayET', 'Report Card Distribution', 'MP3 Report Cards Distributed'],
    '4/10/2025': ['AssemblyAdjusted', 'Health Fair', 'Three rotations to be held during 3rd period'],
    '4/11/2025': ['PepRally', 'Pep Rally', '"Clash of the Classes"', 'Deadline to complete and verify 75 SSL Hours Completed (for Senior Graduation)'],
    '4/14/2025': ['None', 'Spring Break'],
    '4/15/2025': ['None', 'Spring Break'],
    '4/16/2025': ['None', 'Spring Break'],
    '4/17/2025': ['None', 'Spring Break'],
    '4/18/2025': ['None', 'Spring Break'],
    '4/21/2025': ['None', 'Spring Break'],
    '4/29/2025': ['EagleTime', 'Eagle Time',
        'Tests for IB Physics, IB SEHS',
        'IB Physics paper 1 (12:00 pm)\nIB SEHS paper 1 & 3 (12:00 pm)'
    ],
    '4/30/2025': ['Regular', 'Regular Schedule',
        'Tests for IB Business, IB Physics, IB SEHS',
        'IB Physics paper 2 (8:00 am)\nIB SEHS paper 2 (8:00 am)\nIB Business paper 1 (& 3, HL only) (12:00 pm)'
    ],

    '5/2/2025': ['Regular', 'Regular Schedule',
        'Tests for IB Business, IB ESS',
        'IB Business paper 2 (8:00 am)\nIB ESS paper 1 (12:00 pm)\nMP4 Interim Grades in for Seniors!'
    ],
        
    '5/5/2025': ['Regular', 'Regular Schedule',
        'Tests for IB ESS, IB History',
        'IB ESS paper 2 (8:00 am)\nIB History paper 1 & 2 (12:00 pm)\nMCAP Testing May 5-9 (for Seniors, if not taken yet)'
    ],
    '5/6/2025': ['EagleTime', 'Eagle Time',
        'Tests for AP Gov, IB History',
        'IB History paper 3 (8:00 am)\nAP Gov Test (12:00 pm)\nMCAP Testing May 5-9 (for Seniors, if not taken yet)'
    ],
    '5/7/2025': ['Regular', 'Regular Schedule',
        'Tests for AP Java, IB Psychology',
        'AP Java Test (12:00 pm)\nIB Psychology paper 1 (12:00 pm)\nMCAP Testing May 5-9 (for Seniors, if not taken yet)'
    ],
    '5/8/2025': ['EagleTime', 'Eagle Time',
        'Tests for AP African Amer. Studies, IB Psychology, AP Stat, IB Lit., IB Lang. Lit.',
        'AP African American Studies Test (8:00 am)\nAP Statistics Test (8:00 am)\nIB Psychology paper 2 (8:00 am)\nIB Lit. paper 1 (12:00 pm)\nIB Lang. Lit. paper 1 (12:00 pm)\nMCAP Testing May 5-9 (for Seniors, if not taken yet)'
    ],
    '5/9/2025': ['Regular', 'Regular Schedule',
        'Tests for APUSH, IB Lit., IB Lang. Lit., IB Geography, IB Soc Cult.',
        'APUSH test (8:00 am)\nIB Lit. paper 2 (8:00 am)\nIB Lang. Lit. paper 2 (8:00 am)\nIB Geography paper 1 (12:00 pm)\nIB Societies and Cultures paper 1 (12:00 pm)\nInterim Grades In\nMP4 Interim Report Cards Mailed (Seniors)\nMCAP Testing May 5-9 (for Seniors, if not taken yet)'
    ],
        
    '5/12/2025': ['Regular', 'Regular Schedule',
        'Tests for IB Biology, AP Calc AB/BC, IB Geography, IB Soc Cult.',
        'AP Calculus AB Test (8:00 am)\nAP Calculus BC Test (8:00 am)\nIB Geography paper 2 (8:00 am)\nIB Societies and Cultures paper 2 (8:00 am)\nIB Biology paper 1 (12:00 pm)'
    ],
    '5/13/2025': ['EagleTime', 'Eagle Time',
        'Tests for IB Biology, IB Economics, AP Precalculus',
        'AP Precalculus Test (8:00 am)\nIB Biology paper 2 (8:00 am)\nIB Economics paper 2 (12:00 pm)'
    ],
    '5/14/2025': ['Regular', 'Regular Schedule',
        'Tests for IB Economics, IB Spanish',
        'IB Economics paper 2 (8:00 am)\nIB Spanish paper 1 & 2 (12:00 pm)'
    ],
    '5/15/2025': ['EagleTime', 'Eagle Time',
        'Tests for APCSP, IB Calc, IB Stat, IB Spanish',
        'IB Spanish paper 2 (8:00 am)\nAPCSP Test (12:00 pm)\nIB Analysis & Approaches paper 1 (12:00 pm)\nIB Applications & Interpretations paper 1 (12:00 pm)'
    ],
    '5/16/2025': ['Regular', 'Regular Schedule',
        'Tests for IB Chemistry, IB Calc, AP Psychology, IB Stat',
        'IB Analysis & Approaches paper 2 (8:00 am)\nIB Applications & Interpretations paper 2 (8:00 am)\nAP Psychology Test (12:00 pm)\nIB Chemistry paper 1 (12:00 pm)\nMP4 Interim Report Cards Mailed\nDeadline For All Classwork (Seniors in Project GRAD Only)'
    ],

    '5/19/2025': ['Regular', 'Regular Schedule',
        'Tests for IB Chemistry, IB Global Politics',
        'IB Chemistry paper 2 (8:00 am)\nIB Global Politics paper 1 (12:00 pm)'
    ],
    '5/20/2025': ['EagleTime', 'Eagle Time',
        'Tests for IB French, IB Global Politics',
        'IB Global Politics paper 2 (8:00 am)\nIB French paper 1 & 2 (12:00 pm)'
    ],
    '5/21/2025': ['Regular', 'Regular Schedule',
        'Tests for IB Calc, IB Stat, IB French',
        'IB French paper 2 (8:00 am)\nIB Analysis & Approaches paper 3 (12:00 pm)\nIB Applications & Interpretations paper 3 (12:00 pm)'
    ],
    
    '5/23/2025': ['Regular', 'Regular Schedule', 'Seniors\' Last Day', 'Deadline for All Classwork (Seniors)'],
    '5/26/2025': ['None', 'Memorial Day', 'Schools and offices closed'],
    '5/29/2025': ['EagleTime', 'Eagle Time', 'Graduation Rehearsal @ 7:45 am'],
    '5/30/2025': ['Regular', 'Regular Schedule', 'Graduation Ceremonies @ UMBC at 2 pm'],

    '6/6/2025': ['None', 'No School', 'Staff Professional Day'],
    '6/12/2025': ['EagleTime', 'Eagle Time', 'MP4 last update to student schedules by 5 pm'],
    '6/13/2025': ['Early Release', 'Last Day of School', 'End of MP4'],
    '6/16/2025': ['None', 'No School'],
    '6/17/2025': ['None', 'Possible Make-up Day', 'MP4 Final grades in by 12 pm!'],
    '6/18/2025': ['None', 'Possible Make-up Day'],
    '6/19/2025': ['None', 'No School', 'Systemwide Closure — Schools and offices closed'],
    '6/20/2025': ['None', 'Possible Make-up Day'],
    '6/23/2025': ['None', 'Possible Make-up Day'],
    '6/24/2025': ['', '', 'MP4 Report Cards in Synergy'],
    '6/25/2025': ['', '', 'MP4 Report Cards Distributed'],
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


// ------------------------- Classes -------------------------


// class ScheduleTable {
//     /**
//      * 
//      * @param {Object} scheduleData Take data from data.js
//      * @param {HTMLTableElement} scheduleElement The reference pointing to the element
//      */
//     constructor(scheduleData, scheduleElement) {
//         this.periods - scheduleData.periods
//     }
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
    var extraExtraComments;

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

        // console.log(
        //     "scheduleName: "+specialSchedule[0]
        //     + ", scheduleAlias: "+specialSchedule[1]
        //     + ", date to be accessed: "
        //     + (
        //         (searchDate.getMonth()+1)
        //         + "/" + searchDate.getDate()
        //         + "/" + searchDate.getFullYear()
        //     )
        // );
        
        scheduleName = specialSchedule[0];
        scheduleAlias = specialSchedule[1];
        if (specialSchedule.length > 2 && specialSchedule[2] != '')
            extraComments = specialSchedule[2];
        if (specialSchedule.length > 3 && specialSchedule[3] != '')
            extraExtraComments = specialSchedule[3];
    }

    var dayRGB = [0,0,0] // placeholder
    
    return {
        'scheduleName': scheduleName,
        'scheduleAlias': scheduleAlias,
        'extraComments': extraComments,
        'extraExtraComments': extraExtraComments,
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
