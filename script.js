(function() {
	var updateTime = function(h, m) {
		var now = new Date(),
			hour, minute, words,
			twelveHourClockHour,
			i, len, highlights = [],
			nums = ["one", "two", "three", "four", "five", "six",
				"seven", "eight", "nine", "ten", "eleven", "twelve"];
		
		if (h === undefined || m === undefined) {
			hour = now.getHours();
			minute = now.getMinutes();
		} else {
			hour = parseInt(h, 10);
			minute = parseInt(m, 10);
		}

		if (minute >= 3 && minute < 7) {
			highlights.push("minute-five", "past");
		} else if (minute >= 7 && minute < 13) {
			highlights.push("minute-ten", "past");
		} else if (minute >= 13 && minute < 17) {
			highlights.push("quarter", "past");
		} else if (minute >= 17 && minute < 23) {
			highlights.push("twenty", "past");
		} else if (minute >= 23 && minute < 37) {
			highlights.push("half", "past");
		} else if (minute >= 37 && minute < 42) {
			highlights.push("twenty", "to");
		} else if (minute >= 42 && minute < 48) {
			highlights.push("quarter", "to");
		} else if (minute >= 48 && minute < 53) {
			highlights.push("minute-ten", "to");
		} else if (minute >= 53 && minute < 57) {
			highlights.push("minute-five", "to");
		} else {
			highlights.push("o-clock");
		}

		twelveHourClockHour = hour % 12;
		if (twelveHourClockHour === 0) twelveHourClockHour = 12;

		if (twelveHourClockHour === 12 && minute >= 37) {
			highlights.push(nums[0]);
		} else {
			highlights.push((minute < 37) ? nums[twelveHourClockHour-1] : nums[twelveHourClockHour]);
		}

		words = document.querySelectorAll(".word");
		len = words.length;
		for (i = 0; i < len; i++) {
			words[i].className = "word";
		}

		len = highlights.length;
		for (i = 0; i < len; i++) {
			document.getElementById(highlights[i]).className = "word active";
		}
	}

	var ready = function() {
		var updateInterval = setInterval(updateTime, 1000);
		updateTime();

		document.getElementById('update').addEventListener('click', function() {
			updateTime(document.getElementById('hour').value, 
				document.getElementById('minute').value);
			clearTimeout(updateInterval);
			return false;
		});
	}

	window.addEventListener('load', ready);
})();