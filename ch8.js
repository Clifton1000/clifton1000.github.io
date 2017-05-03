// JS CHAPTER 8

"use strict";

// global variables
var profile = {};  // object
var investing = [];  //array object
var objectString;
var arrayString;

// validate entered username
function validateUsername() {
//js var unInput = document.getElementById("uname"); 
   var unInput = $("#uname"); /* jQuery */
//js var errorDiv = document.getElementById("usernameError"); 
   var errorDiv = $("#usernameError"); /* jQuery */
   try { 
//js  if (/.{4,}/.test(unInput.value) === false) 
	  if (/.{4,}/.test(unInput.val()) === false) /*	jQuery - if length of uname is < 4, an error is thrown */
	   {
	     throw "Username must be at least 4 characters long";
//js   } else if (/\W/.test(unInput.value) === true) {
	  } else if (/\W/.test(unInput.val()) === true) { /* jQuery  */
		  			
         throw "Username must contain only letters and numbers";
      }

      // remove any username error styling and message
//js  unInput.style.background = "";
	  unInput.css("background", "" ); /* jQuery */
//js  errorDiv.style.display = "none";
	  errorDiv.css("display", "none" ); /* jQuery */
//js  errorDiv.innerHTML = "";
	  errorDiv.html(""); /* jQuery - no red text beneath uname input box */
      // establish 'username' as profile object's value, then copy the user input to profile object
//js  profile.username = unInput.value;
      profile.username = unInput.val(); /* jQuery */
      // copy profile.username value to profile section
//js  document.getElementById("profileUsername").innerHTML = profile.username;
	  $("#profileUsername").html(profile.username); /* jQuery */
      // make profile section and username section visible
//js  document.getElementById("profile").style.display = "block";
	  $("#profile").css("display", "block");  /* jQuery */
//js  document.getElementById("usernameSection").style.display = "block";
	  $("#usernameSection").css("display", "block"); /* jQuery */
   }
   catch(msg) {
      // display error message
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      // change input style
//js  unInput.style.background = "rgb(255,233,233)";
	  unInput.css("background", "rgb(255,233,233)"); /* jQuery */
   }
}

// validate entered password
function validatePassword() {
   var pw1Input = document.getElementById("pw1");
   var pw2Input = document.getElementById("pw2");
   var errorDiv = document.getElementById("passwordError");
   
   try {
	//   if (pw1Input.value.length < 8) { //if password is < 8 char in length, if statement throws an error
	   if (/.{8,}/.test(pw1Input.value) === false) {
	   	 throw "Password must be at least 8 characters";
		   // password2 msut match the first
	   } else if (pw1Input.value.localeCompare(pw2Input.value) !== 0) {
		   throw "Passwords must match";
	   } else if (/[a-zA-Z]/.test(pw1Input.value) === false) {
         throw "Password must contain at least one letter";
      } else if (/\d/.test(pw1Input.value) === false) {
         throw "Password must contain at least one number";
      } else if (/[!@#$%^&*()_]/.test(pw1Input.value) === false) {
         throw "Password must contain at least one symbol: !@#$%^&*()_";
      }

      // remove any password error styling and message
      pw1Input.style.background = "";
      pw2Input.style.background = ""; 
	  errorDiv.style.display = "none";  
      errorDiv.innerHTML = "";
      // copy valid password to profile object
      profile.password = pw1Input.value;
   }
   catch(msg) {
      // display error message
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      // change input style
      pw1Input.style.background = "rgb(255,233,233)";
      pw2Input.style.background = "rgb(255,233,233)";
   }
}
// validate entered email
function validateEmail() {
   var emailInput = document.getElementById("emailbox");
   var errorDiv = document.getElementById("emailError");
   var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
   try { /*determine whether the string passed to either methods contains an @ sign (/reg exp/) AND period.*/
	   //if (emailInput.value.search(/@/) === -1 ||
	   //   emailInput.value.lastIndexOf(".") === -1) {
	  // if (
	//	   (/@/.test(emailInput.value) === false) || (
	//	   		(/\...$/.test(emailInput.value) === false) &&
	//	   		(/\....$/.test(emailInput.value) === false) &&
	//	   		(/\.....$/.test(emailInput.value) === false) &&
	//	   		(/\.......$/.test(emailInput.value) === false)
			   //the dots are for the length of domain identifiers which are 2,3,4 and 6 in length
	//	   )
	//     ) {
	//   if ((/@/.test(emailInput.value) === false) ||
	//	  (/\..{2,6}$/.test(emailInput.value) === false)) {
		 if (emailCheck.test(emailInput.value) === false) {
         throw "Please provide a valid email address";
      }
      // remove any email error styling and message
      emailInput.style.background = "";
      errorDiv.innerHTML = "";
      errorDiv.style.display = "none";
      // convert email address to lowercase
	  emailInput.value = emailInput.value.toLowerCase();
      // copy valid email value to profile object
      profile.email = emailInput.value;
      // copy profile.email value to profile section
      document.getElementById("profileEmail").innerHTML = profile.email;
      // make profile section and email section visible
      document.getElementById("profile").style.display = "block";
      document.getElementById("emailSection").style.display = "block";
   }
   catch(msg) {
      // display error message
      errorDiv.innerHTML = msg;
      errorDiv.style.display = "block";
      // change input style
      emailInput.style.background = "rgb(255,233,233)";
   }
}

// add Investments to profile
function registerInvestments(event) {
   if (event === undefined) { // get caller element in IE8
      event = window.event;
   }
   var callerElement = event.target || event.srcElement;
   var investName = callerElement.value;
   if (callerElement.checked) { // if box has been checked
	   // if so, add the checkbox value to investing array
      investing.push(investName); //push() is an array method & investing is an array object
      // add checkbox value to list in profile section
      var newInvesting = document.createElement("li");
      newInvesting.innerHTML = investName;
      document.getElementById("profileInvestings").appendChild(newInvesting);
      // make profile section and Investing section visible
      document.getElementById("profile").style.display = "block";
      document.getElementById("investingSection").style.display = "block";
    } else { // if box has just been unchecked
      var listItems = document.querySelectorAll("#profileInvestings li");
      for (var i = 0; i < listItems.length; i++) { /* pg 583 */
         if (listItems[i].innerHTML === investName) {
			 // deletes a single element of the investing array at the current index (i).
            investing.splice(i, 1); //splice method removes an unchecked selection from investing
            // remove lodging from profile list
            listItems[i].parentNode.removeChild(listItems[i]);
            break;
         }
      }
   }
}

// convert form input to strings for submission
function convertToString() {
   // convert investing array to string which makes it easier to read -- separated by commas
   arrayString = investing.toString();
   // convert profile object to string
   objectString = JSON.stringify(profile);
}

function createEventListeners() {
   var unInput = document.getElementById("uname");
   var pw2Input = document.getElementById("pw2");
   var emailInput = document.getElementById("emailbox");
   if (unInput.addEventListener) {
	   /*listen for the 'change' event for when the focus leaves the box and the value has changed */
      unInput.addEventListener("change", validateUsername, false);
      pw2Input.addEventListener("change", validatePassword, false);
      emailInput.addEventListener("change", validateEmail, false);
   } else if (unInput.attachEvent) { //IE8 compatibility
      unInput.attachEvent("onchange", validateUsername);
      pw2Input.attachEvent("onchange", validatePassword);
      emailInput.attachEvent("onchange", validateEmail);
   }

   var investing = document.getElementsByName("investments");
   if (investing[0].addEventListener) {
      for (var i = 0; i < investing.length; i++) {
         investing[i].addEventListener("change", registerInvestments, false);
      }
   } else if (investing[0].attachEvent) { //IE8 compatibility
      for (var i = 0; i < investing.length; i++) {
         investing[i].attachEvent("onchange", registerInvestments);
      }
   }

   var button = document.getElementById("createBtn");
   if (button.addEventListener) {
      button.addEventListener("click", convertToString, false);
   } else if (button.attachEvent) {//IE8 compatibility
      button.attachEvent("onclick", convertToString);
   }
}

if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {//IE8 compatibility
   window.attachEvent("onload", createEventListeners);
}
