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

//Create variables to hold user input
var trainNameInput = $('#trainNameInput').val().trim();
var destinationInput = $('#destinationInput').val().trim();
var startTimeInput = $('#startTimeInput').val().trim();
var frequencyInput = $('#frequencyInput').val().trim();

// Capture Button Click
$("#submitTrain").on("click", function() {
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

	//create rows to hold the capturing value inputs
	var $trainBody = $('#trainRows');
	var $trainRow = $('<tr>');
	var $trainName = $('<td>').html(childSnapshot.val().trainName).appendTo($trainRow);
	var $destination = $('<td>').html(childSnapshot.val().destination).appendTo($trainRow);
	var $frequency = $('<td>').html(childSnapshot.val().frequency).appendTo($trainRow);
	var minutesAway = $('<td>').html(childSnapshot.val().minutesAway).appendTo($trainRow);
	var nextTrain = $('<td>').html(childSnapshot.val().nextTrain).appendTo($trainRow);


	 //Set start time for each train
    var startTime = moment(childSnapshot.val().startTime, 'hh:mm');
    console.log("start time: " + startTime);

    //current time to find out difference
    var currentTime = moment();
    console.log("current time is: " + moment(currentTime).format("hh:mm"));

    //total time between initial and current
    var difference = moment().diff(moment(startTime), "minutes");
    console.log("difference in initial time and current time: " + difference);

    //use modular to figure out time 
    var frequency = moment(childSnapshot.val().frequency, "minutes");
    var remainder = difference % frequency;
    console.log("modular: " + remainder);

    //minutes away time calculation
    var minutesAway = frequency - remainder;
    console.log("minutes away: " + minutesAway);

    //calculate the next train arrival time
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));
		
	$trainRow.appendTo($trainBody);


// Handle the errors
}, function(errorObject) {

	console.log("Errors handled: " + errorObject.code);
});
