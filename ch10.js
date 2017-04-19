/* chapter 10 */

"use strict";

/*   geoTest(); don't call the geoTest function here, Google API (line 12) instead */
   // to minimize data use, download map only if needed and not already downloaded
   if (typeof google !== 'object') {
      var script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=geoTest";
      document.body.appendChild(script);
   }

function geoTest() {
	//if the user waits 10 seconds (10,000ms) to approve, then location information will fail to load!
   waitForUser = setTimeout(fail, 10000);
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(createDirections, fail, {timeout: 10000});//pg701-703
   } else {
      fail();
   }
}

var waitForUser;

/* when geolocation property of Navigator object succeeds (line 133), it calls createDirections() and assigns the positions*/
function createDirections(position) {
   clearTimeout(waitForUser);
   var currPosLat = position.coords.latitude; //parameter.coords.property  
   var currPosLng = position.coords.longitude; //parameter.coords.property 
   var currPosAlt = position.coords.altitude; //parameter.coords.property 
//	console.log("altitude: " + position.coords.altitude);
//	console.log("longitude: " + position.coords.longitude);
//	console.log("latitude: " + position.coords.latitude);
   document.getElementById("lat").innerHTML = currPosLat;
   document.getElementById("lng").innerHTML = currPosLng;
   document.getElementById("alt").innerHTML = currPosAlt;

   var mapOptions = { //create an object, mapOptions that sets the parameters for the map
	   /*pg711  zoom and center properties are required by the API but the API supports more */
      center: new google.maps.LatLng(currPosLat, currPosLng),
      zoom: 13
   };
	/*use Map() -- a constructor, which is a function that creates a new instance of an object. Thus a Map() constructor creates a map object with the following specific sytnax. Now we have a map using Google's API */ 
   var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function fail() {
//   console.log("Geolocation information not available or not authorized.");
   document.getElementById("map").innerHTML = "Unable to access your current location.";
}

