 /*
 Project: Javascript
 Author: Shane Byrd
 Date: 3/20/17
 */



function resetForm() {
    //create a resetForm function for users to refresh page and return to value of 1 for # of micros.
    document.getElementById("micros").value = 1;
    createEventListeners();
  }
    function buttonClickHandler() {//function that handles when the button is clicked
        document.getElementById("number_error_display").innerHTML = "";
        try {
            if (document.getElementById("micros").value <= 0) {
                throw "Please enter a number greater than 0";
            }
        }
        catch(errorMsg) { //block of code to handle errors
          //display error message
          document.getElementById("number_error_display").innerHTML = errorMsg;
	      //remove output display
		  document.getElementById("output").style.display = "none";
        }
    }
document.getElementById("calcBtn").addEventListener("click", buttonClickHandler, false);

//global variable for chaper 6
var formValidity = true;

//validate form function chapter 6
function validateForm(evt) {
	if (evt.preventDefault) {
		evt.preventDefault(); //prevent form from submitting
	} else {
		evt.returnValue = false; //prevent form from submitting in IE8
	}
	formValidity = true; //reset value for revalidation
	//replace with calls to validation functions
	if (formValidity === true) {
		document.getElementById("errorText").innerHTML = "";
		document.getElementById("errorText").style.display = "none";
		document.getElementsByTagName("form")[0].submit();
	} else {
		document.getElementById("errorText").innerHTML = "Please fill out fields accurately to submit.";
		document.getElementById("errorText").style.display = "block";
		scroll(0,0);
	}
}
function createEventListeners() {
  //when someone clicks 'submit' the event listener click does its work
document.getElementById("calcBtn").addEventListener("click", calcMicros, false);
	//For clicking on the other button
document.getElementById("tradeStyleBtn").addEventListener("click", tradeStyle, false);
	//chapter 6 - validate form
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
	form.addEventListener("submit", validateForm, false);
} else if (form.attachEvent) {
	form.attachEvent("onsubmit", validateForm);
}
}

function tradeStyle() {

	//console.log("Clicked");
	var freeTime = document.getElementById("style").value;
	// The code makes a decision based on the freeTime value
	switch (freeTime) {//Displays a string value depending on user input 1, 2, 3, 4.
		case "1":
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
var initialBalance = "4000";
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
