var updateCountdownTimeouts = [];
var countdownDelay = 1000;
var countdownStartTime = -1;

/**
 * 
 * @param {HTMLDivElement} countdownHTML 
 * @param {Date} now
 */
function updateCountdown(countdownHTML, now = new Date()) {
    var endDate = new Date(countdownHTML.dataset.endDate);

    var countdownUnitElements = {
        "days": countdownHTML.getElementsByClassName("countdownUnitDays")[0],
        "schoolDays": countdownHTML.getElementsByClassName("countdownUnitSchoolDays")[0],
        "hours": countdownHTML.getElementsByClassName("countdownUnitHours")[0],
        "minutes": countdownHTML.getElementsByClassName("countdownUnitMinutes")[0],
        "seconds": countdownHTML.getElementsByClassName("countdownUnitSeconds")[0]
    }

    // calculations

    var dateIterator = new Date(now);

    var daysDifference = 0;
    var schoolDaysDifference = 0;
    var hoursDifference = 0;
    var minutesDifference = 0;
    var secondsDifference = 0;

    if (now < endDate) {

        // date: daysDifference, schoolDaysDifference

        while (
            dateIterator.getMonth() < endDate.getMonth()
            || (
                dateIterator.getDate() < endDate.getDate()
                && (
                    dateIterator.getTime() + (24 * 3600 * 1000)
                    < endDate.getTime()
                )
            )
        ) {
            daysDifference++;

            if (!['None', null].includes(getCalendar(dateIterator).scheduleName))
                schoolDaysDifference++;

            dateIterator.setDate(dateIterator.getDate() + 1);
        }

        // time: hoursDifference, minutesDifference, secondsDifference

        hoursDifference = Math.floor((endDate - dateIterator) / 1000 / 60 / 60);
        minutesDifference = Math.floor((endDate - dateIterator) / 1000 / 60) - hoursDifference * 60;
        secondsDifference = Math.floor((endDate - dateIterator) / 1000) - minutesDifference * 60 - hoursDifference * 3600;

        // console.log('ends '+countdownHTML.dataset.endDate)
        // console.log(daysDifference,'days')
        // console.log(schoolDaysDifference,'school days')
        // console.log(hoursDifference,'hrs')
        // console.log(minutesDifference,'mins')
        // console.log(secondsDifference,'secs')

    } else {
        countdownHTML.parentElement.style.background = "linear-gradient(180deg, #e9ca92 20%, #e3836e 49%, #c08323 50%, #ffb13e 53%, #e66465 95%)";
    }

    // put the numbers in their right places
    for (const countdownUnit of Object.values(countdownUnitElements).filter((v) => v != undefined)) {
        var textElement = countdownUnit.firstElementChild;
        var unitNameTextElement = countdownUnit.lastElementChild;

        var textElement = countdownUnit.firstElementChild;
        var unitNameTextElement = countdownUnit.lastElementChild;
        var countdownUnitClass = countdownUnit.classList[1];

        var timeDifference = 0;
        switch (countdownUnitClass) {
            case "countdownUnitDays":
                timeDifference = daysDifference;
                textElement.textContent = timeDifference;
                if (timeDifference == 1) {
                    unitNameTextElement.textContent = "day"
                } else {
                    unitNameTextElement.textContent = "days";
                }
                break;
            case "countdownUnitSchoolDays":
                timeDifference = schoolDaysDifference;
                textElement.textContent = timeDifference;
                if (timeDifference == 1) {
                    unitNameTextElement.textContent = "school day"
                } else {
                    unitNameTextElement.textContent = "school days";
                }
                break;
            case "countdownUnitHours":
                timeDifference = hoursDifference;
                textElement.textContent = timeDifference;
                if (timeDifference == 1) {
                    unitNameTextElement.textContent = "hour"
                } else {
                    unitNameTextElement.textContent = "hours";
                }
                break;
            case "countdownUnitMinutes":
                timeDifference = minutesDifference;
                textElement.textContent = timeDifference;
                if (timeDifference == 1) {
                    unitNameTextElement.textContent = "minute"
                } else {
                    unitNameTextElement.textContent = "minutes";
                }
                break;
            case "countdownUnitSeconds":
                timeDifference = secondsDifference;
                textElement.textContent = timeDifference;
                if (timeDifference == 1) {
                    unitNameTextElement.textContent = "second"
                } else {
                    unitNameTextElement.textContent = "seconds";
                }
                break;
            default:
                break;
        }
    }

    if (now < endDate) {
        updateCountdownTimeouts.forEach((value) => clearTimeout(value));
        updateCountdownTimeouts.length = 0;
        updateCountdownTimeouts.push(setTimeout(updateAllCountdowns, countdownDelay));
    }
}

/**
 * 
 * @param {HTMLCollectionOf<HTMLDivElement>} countdownHTMLList 
 */
function updateAllCountdowns(countdownHTMLList = document.getElementsByClassName("countdownUnitContainer")) {
    var now = new Date();
    for (const countdownHTML of countdownHTMLList) {
        updateCountdown(countdownHTML, now);
    }
}
