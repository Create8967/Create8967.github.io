function swapImage() {
	var imgDisplayed = document.getElementById('click-image');
	if (imgDisplayed.src.match("images/arduino-logo.png")) {
		imgDisplayed.src = "images/5.png";
	}
	else if (imgDisplayed.src.match("images/5.png")) {
		imgDisplayed.src = "images/4.png";
	}
	else if (imgDisplayed.src.match("images/4.png")) {
		imgDisplayed.src = "images/3.png";
	}
	else if (imgDisplayed.src.match("images/3.png")) {
		imgDisplayed.src = "images/2.png";
	}
	else if (imgDisplayed.src.match("images/2.png")) {
		imgDisplayed.src = "images/1.png";
	}
	else if (imgDisplayed.src.match("images/1.png")) {
		imgDisplayed.src = "images/arduino-logo.png";
		window.open("https://www.arduino.cc");
	}
}