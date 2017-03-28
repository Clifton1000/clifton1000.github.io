/* -- part 1 of chapter 6 JavaScript assignment -- */

//custom validation functions will be called from my main function, which I will create now
var form = document.getElementsByTagName("form")[0]; //get my first (and only) form
if (form.addEventListener) { // if the form is submitted...
	form.addEventListener("submit", validateForm, false); //... execute this
}

var formValidity = true; //global variable will be used to track if the form is valid

/* validate payment fieldset - variable declarations */
function validatePayment() {
	var errorDiv = document.querySelector("#paymentInfo .errorMessage");
	var fieldsetValidity = true;
	var ccNumElement = document.getElementById("ccNum");
	var selectElements = document.querySelectorAll("#paymentInfo select");
	var elementCount = selectElements.length;
	var cvvElement = document.getElementById("cvv");
	var cards = document.getElementsByName("PaymentType");
	var currentElement;
//JA: I think you typed this ending bracket too soon. It should go after the last catch block ends
//}

	try {
		if (!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked) {
			for (i = 0; i < 4; i++) {
				cards[i].style.outline = "1px solid red";
			}
			fieldsetValidity = false;
		} else {
			for (i = 0; i < 4; i++) {
				cards[i].style.outline = "";
			}
		}
		if (ccNumElement.value === "") {
			//verify that a card # has been entered
			ccNumElement.style.background = "rgb(255, 233, 233)";
			fieldsetValidity = false;
		} else {
			ccNumElement.style.background = "white";
		}
		for (var i = 0; i < elementCount; i++) {
			//verify that a month has been selected
			currentElement = selectElements[i];
			if (currentElement.selectedIndex === -1) {
				currentElement.style.border = "1px solid red";
				fieldsetValidity = false;
			} else {
				currentElement.style.border = "";
			}
		}
		if (cvvElement.value === "") {
			//verify that a cvv value has been entered
			cvvElement.style.background = "rgb(255,233,233)";
			fieldsetValidity = false;
		} else {
			cvvElement.style.background = "white";
		}
		if (!fieldsetValidity) { //check if any field is blank
			throw "please complete all payment information.";
		} else {
			errorDiv.style.display = "none";
		}
	}

	catch(msg) {
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}

/* -- I got close to fname, lname validation below -- */
	
function validateForm(evt) {
	if (evt.preventDefault) {
		evt.preventDefault(); //prevent form from submitting
	} else {
		evt.returnValue = false; //IE8
	}
	formValidity = true; //reset value for revalidation
	validatePayment();
	//calls to validation functions go beneath here
	if (document.getElementById("fname").value === "") {
		document.getElementById("names").innerHTML = ("Please fill out the fields in pink");
		formValidity = false;
	}
	if (document.getElementById("lname").value === "") {
		document.getElementById("names").innerHTML = ("Please fill out the fields in pink");
		formValidity = false;
	}
	if (formValidity === true) {
		//if user fills out form correctly, display nothing and submit the form
		document.getElementById("errorText").innerHTML = "";
		document.getElementById("errorText").style.display = "none";
		document.getElementsByTagName("form")[0].submit();
	} else {
		//if user incorrectly fills out form, do this
		document.getElementById("errorText").innerHTML = "Please fill out fields completely and accurately to submit.";
		document.getElementById("errorText").style.display = "block";
		scroll(0,0);
	}
}

/* -- part 2 of chaper 6 assignment -- */

//the textarea box must be filled out
function autocheckCustom() {
	var messageBox = document.getElementById("customText");
	if (messageBox.value !== "") { //if user types something, then run the following
		document.getElementById("custom").checked = "checked";
		// ^^ if user entry in textarea, check Custom check box		
	}
}
function createEventListeners() {
	var messageBox = document.getElementById("customText");
	if (messageBox.addEventListener) {//we're adding an event listener to messageBox AND calling our autocheck function
		messageBox.addEventListener("blur", autocheckCustom, false); //fired when an element has lost focus
	} else if (messageBox.attachEvent) {//simply another way to call the function using other browsers
		messageBox.attachEvent("onblur", autocheckCustom);
	}
}
createEventListeners();
