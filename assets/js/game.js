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
$("#add-train").on("click", function (event) {
    event.preventDefault();

    // Train form values
    train_name = $("#train_name").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    first_train = $("#first_train").val().trim();

    // Creating an Object with the Form Input
    var train_input = {
        train_name: train_name,
        destination: destination,
        frequency: frequency,
        first_train: first_train
    }
    // Condition if not all parts of the form is filled out
    if (train_name === '' || destination === '' || frequency === '' || first_train === '') {
       // It will then alert you to completely fill it out
        alert('Please fill out form completely.')
    } else {
        // Testing to see if data is received from submiting form.
        console.log(train_input)
        // Creating the values within database
        database.ref().push(train_input);
    }

});

// Firebase watcher + initial loader
database.ref().on("child_added", function (snapshot) {
    var train_data = snapshot.val()

    // Console log test for to make sure data is going thru properly
    console.log(train_data.train_name);
    console.log(train_data.destination);
    console.log(train_data.frequency);
    console.log(train_data.first_train);

    // Changes the First Train Input into Military time using Moment JS
    var first_train = moment(train_data.first_train, `HH:mm`);
    console.log(first_train)

    var difference = moment().diff(moment(first_train), `minutes`);

    var timeRemaining = difference%train_data.frequency;

    var minutes_away = train_data.frequency - timeRemaining;
    // 
    var next_arrival = moment().add(minutes_away, `minutes`);

    // Changes format of time for Next Arrival
    next_arrival = moment(next_arrival).format(`h:mm A`);

    // Change the HTML to reflect into table.
    var train_info = `
    <tr>
    <td>${train_data.train_name}</td>
    <td>${train_data.destination}</td>
    <td>${train_data.frequency}</td>
    <td>${next_arrival}</td>
    <td>${minutes_away}</td>
    </tr>
    `
    // Appending the new train information
    $(`#new_data`).append(train_info);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});