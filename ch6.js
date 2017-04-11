/* -- part 1 of chapter 6 JavaScript assignment -- */

//custom validation functions will be called from my main function, which I will create now
var form = document.getElementsByTagName("form")[0]; //get my first (and only) form
if (form.addEventListener) { // if the form is submitted...
	form.addEventListener("submit", validateProfile, false); //... execute this
}

var profileValidity = true; //global variable will be used to track if profiles are valid

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
			//verify that a credit card # has been entered
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
		profileValidity = false;
	}
}

/* -- contact.html -- */
	
function validateProfile(evt) {
	var fnameElement = document.getElementById("fname");
	var lnameElement = document.getElementById("lname");
	var emailElement = document.getElementById("email");
	var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
	
	if (evt.preventDefault) {
		evt.preventDefault(); //prevent form from submitting
	} else {
		evt.returnValue = false; //IE8
	}
	profileValidity = true; //reset value for revalidation
	validatePayment();
	//calls to validate functions go beneath here
	if (fnameElement.value === "") {
			//verify that a first name has been entered
		fnameElement.style.background = "rgb(255,233,233)";
		profileValidity = false;
	} else {
			fnameElement.style.background = "white";
	}
	if (lnameElement.value === "") {
			//verify that a first name has been entered
		lnameElement.style.background = "rgb(255,233,233)";
		profileValidity = false;
	} else {
			lnameElement.style.background = "white";
	}
	if (emailCheck.test(emailElement.value) === false) {
		emailElement.style.background = "rgb(255,233,233)";
		profileValidity = false;
	} else {
		emailElement.style.background ="white";
	}
	if (profileValidity === true) {
		//if user fills out form correctly, display nothing and submit the form
		document.getElementById("errorText").innerHTML = "";
		document.getElementById("errorText").style.display = "none";
		document.getElementsByTagName("form")[0].submit();
	} else {
		//if user incorrectly fills out form, do this
		document.getElementById("errorText").innerHTML = "Please fill out required fields.";
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
	} else if (messageBox.attachEvent) {//call the function using other browsers
		messageBox.attachEvent("onblur", autocheckCustom);
	}
}
createEventListeners();
