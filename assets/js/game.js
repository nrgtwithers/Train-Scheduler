// Initialize connection to Firebase

var config = {
    apiKey: "AIzaSyAaSPvGSdh8VxsaIQYU2_iL8AruQRUkhHs",
    authDomain: "distributed-eye-226422.firebaseapp.com",
    databaseURL: "https://distributed-eye-226422.firebaseio.com",
    projectId: "distributed-eye-226422",
    storageBucket: "distributed-eye-226422.appspot.com",
    messagingSenderId: "439695275055"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Form Values 
var train_name = "";
var destination = "";
var frequency = "";
var next_arrival = "";
var minutes_away = "";

 // Add Train Button Click
 $("#add-train").on("click", function(event) {
    event.preventDefault();

    // Train form values
    train_name = $("#train_name").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    minutes_away = $("#minutes_away").val().trim();

    // Creating the values within database
    database.ref().set({
        train_name: train_name,
        destination: destination,
        frequency: frequency,
        next_arrival: next_arrival,
        minutes_away: minutes_away
      });
 });

     // Firebase watcher + initial loader
     database.ref().on("value", function(snapshot) {

        // Console log test for to make sure data is going thru properly
        console.log(snapshot.val());
        console.log(snapshot.val().train_name);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().frequency);
        // console.log(snapshot.val().next_arrival);
        console.log(snapshot.val().minutes_away);
  
        // Change the HTML to reflect
        $("#new-trainname").text(snapshot.val().train_name);
        $("#new-destination").text(snapshot.val().destination);
        $("#new-frequency").text(snapshot.val().frequency);
        // $("#new-nextarrival").text(snapshot.val().next_arrival);
        $("#new-minutesaway").text(snapshot.val().minutes_away);
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });