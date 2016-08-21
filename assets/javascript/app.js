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

	//Create variables to hold user input
	var trainNameInput = $('#trainNameInput').val().trim();
	var destinationInput = $('#destinationInput').val().trim();
	var startTimeInput = $('#startTimeInput').val().trim();
	var frequencyInput = $('#frequencyInput').val().trim();


	//if the input fields are not empty
	if( trainNameInput != "" &&
		destinationInput != "" &&
		startTimeInput != "" &&
		frequencyInput != "" ){
	//push the data to firebase
	database.ref().push({
		trainName: trainNameInput,
		destination: destinationInput,
		startTime: startTimeInput,
		frequency: frequencyInput
	});}
	//otherwise don't submit
	else {
		return false;
	}

	// Don't refresh the page!
	return false;
})

//Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function(childSnapshot) {

	//create rows to display the database values
	var $trainBody = $('#trainRows');
	var $trainRow = $('<tr>');
	var $trainName = $('<td>').html(childSnapshot.val().trainName).appendTo($trainRow);
	var $destination = $('<td>').html(childSnapshot.val().destination).appendTo($trainRow);
	var $frequency = $('<td>').html(childSnapshot.val().frequency).appendTo($trainRow);	
	
	var frequency = childSnapshot.val().frequency;
	var startTime = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");		
	var minAway = frequency - (moment().diff(moment(startTime), "minutes") % frequency);
	
	var nextTrain = $('<td>').html(moment(moment().add(minAway, "minutes")).format("hh:mm")).appendTo($trainRow);
	var minutesAway = $('<td>').html(minAway).appendTo($trainRow);
		
	$trainRow.appendTo($trainBody);


// Handle the errors
}, function(errorObject) {

	console.log("Errors handled: " + errorObject.code);
});