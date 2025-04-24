var updateCountdownTimeouts = [];
var countdownDelay = 1000;
var countdownStartTime = -1;

/**
 * 
 * @param {HTMLDivElement} countdownHTML 
 * @param {Date} now
 */
function updateCountdown(countdownHTML, now = new Date()) {
    var endDate = new Date(countdownUnitContainer.dataset.endDate);

    console.log(now > new Date('April 24, 2025 11:11:00'))

    var countdownUnitElements = {
        "days": countdownHTML.getElementsByClassName("countdownUnitDays")[0],
        "schoolDays": countdownHTML.getElementsByClassName("countdownUnitSchoolDays")[0],
        "hours": countdownHTML.getElementsByClassName("countdownUnitHours")[0],
        "minutes": countdownHTML.getElementsByClassName("countdownUnitMinutes")[0],
        "seconds": countdownHTML.getElementsByClassName("countdownUnitSeconds")[0]
    }

    console.log(countdownUnitElements);

    for (const countdownUnit of countdownUnitContainer.children) {
        var textElement = countdownUnit.firstElementChild;
        var unitNameTextElement = countdownUnit.lastElementChild;
        var countdownUnitClass = countdownUnit.classList[1];
        console.log(new Date(endDate))
        console.log(countdownUnitClass)

        var timeDifference = 0;
        switch (countdownUnitClass) {
            case "countdownUnitDays":
                timeDifference = endDate.days - now.days;
                textElement.textContent = timeDifference;
                if (timeDifference == 1) {
                    unitNameTextElement.textContent = "day"
                } else {
                    unitNameTextElement.textContent = "days";
                }
                break;
            case "countdownUnitHours":
                timeDifference = endDate.hours - now.hours;
                textElement.textContent = timeDifference;
                if (timeDifference == 1) {
                    unitNameTextElement.textContent = "hour"
                } else {
                    unitNameTextElement.textContent = "hours";
                }
                break;
            case "countdownUnitMinutes":
                timeDifference = endDate.minutes - now.minutes;
                textElement.textContent = timeDifference;
                if (timeDifference == 1) {
                    unitNameTextElement.textContent = "minute"
                } else {
                    unitNameTextElement.textContent = "minutes";
                }
                break;
            case "countdownUnitSeconds":
                timeDifference = endDate.seconds - now.seconds;
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

    if (now <= endDate) {
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
