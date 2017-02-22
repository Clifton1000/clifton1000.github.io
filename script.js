 /*
 Project: Javascript
 Author: Shane Byrd
 Date: 2/20/17
 */
 
//chapter 2

//set a global variable and initialize it to a string value of 4000
var initialBalance = "4000";
      //create a resetForm function for users to refresh page and return to value of 1
function resetForm() {
    document.getElementById("micros").value = 1;

	createEventListeners();
	
}

function createEventListeners() {
  //when someone clicks 'submit' the event handler click does its work
    document.getElementById("calcBtn").addEventListener("click", calcMicros, false);
	//For clicking on the other button
	document.getElementById("tradeStyleBtn").addEventListener("click", tradeStyle, false);
}

function tradeStyle() {
	
	//console.log("Clicked");
	var freeTime = document.getElementById("style").value;
	// The code should make a decision based on the freeTime value
	switch (freeTime) {
		case "1":
			//JA: Display your string value on the page instead of returning a value
			document.getElementById("traderPosition").innerHTML = "Position Trader";
			//return "Position Trader";
			break;
		case "2":
			document.getElementById("traderPosition").innerHTML = "Swing Trader";
			//return "Swing Trader";
			break;
		case "3":
			document.getElementById("traderPosition").innerHTML = "Day Trader";
			//return "Day Trader";
			break;
		case "4":
			document.getElementById("traderPosition").innerHTML = "Scalper";
			//return "Scalper";
			break;
		default:
			document.getElementById("traderPosition").innerHTML = "Please enter a whole number 1-4.";
			//return "Please enter a whole number 1-4";
		 	break;
	}
}

function calcMicros() {
  //convert the number from the form, which is read as a character
  // and converts it to numberical format.
    var initialNumber = parseInt(document.getElementById("micros").value);
    var result = (initialNumber * initialBalance);

//display the output
    document.getElementById("output").innerHTML = "$" + result + " recommended account balance.";
	
	
}
//resets form when page is relaoded
window.addEventListener("load", resetForm, false);



