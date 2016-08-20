// Initialize Firebase
 var config = {
   apiKey: "AIzaSyC-ehwXtAXBFgB1aLN6_A1MrByGbEsSj3A",
    authDomain: "train-scheduler-e5328.firebaseapp.com",
    databaseURL: "https://train-scheduler-e5328.firebaseio.com",
    storageBucket: "train-scheduler-e5328.appspot.com",
 };
 firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Capture Button Click
$("#submitTrain").on("click", function() {
	if (('#trainNameInput'&&'#destinationInput'&&'#startTimeInput'&&'#frequencyInput')!=null){
	database.ref().push({
		trainName: $('#trainNameInput').val().trim(),
		destination: $('#destinationInput').val().trim(),
		startTime: $('#startTimeInput').val().trim(),
		frequency: $('#frequencyInput').val().trim()
	})};

	else {
		return false;
	}

	// Don't refresh the page!

})

//Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function(childSnapshot) {

	// Log everything that's coming out of snapshot
	// console.log(childSnapshot.val());
	// console.log(childSnapshot.val().trainName);
	// console.log(childSnapshot.val().destination);
	// console.log(childSnapshot.val().startTime);
	// console.log(childSnapshot.val().frequency);

	var $trainBody = $('#trainRows');

	var $trainRow = $('<tr>');

	var $trainName = $('<td>').html(childSnapshot.val().trainName).appendTo($trainRow);
	var $destination = $('<td>').html(childSnapshot.val().destination).appendTo($trainRow);
	var $frequency = $('<td>').html(childSnapshot.val().frequency).appendTo($trainRow);
	
	
		
	$trainRow.appendTo($trainBody);


// Handle the errors
}, function(errorObject) {

	console.log("Errors handled: " + errorObject.code);
});
