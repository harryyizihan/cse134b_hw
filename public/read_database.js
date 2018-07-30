(function() {
    var config = {
        apiKey: "AIzaSyCNwQawqcisZevqPOA-HKubRkEQl-CGX0Y",
        authDomain: "real-issue-tracker.firebaseapp.com",
        databaseURL: "https://real-issue-tracker.firebaseio.com",
        storageBucket: "real-issue-tracker.appspot.com"
    };
    firebase.initializeApp(config);

    //const attachment;
    var userId = 'm7f4Z3UVn6fu1OdCsnTsLvSYh1h1';
/*
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userId = user.uid;
        } else {
            alert("You are not logged in, how could you get to this page???");
        }
    });
*/

    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot){
        content = "";
        snapshot.forEach(function(data){
            content +='<tr>';
            content += '<td>' + data.val().issueId + '</td>';
            content += '<td>' + data.val().name + '</td>';
            content += '<td>' + data.val().type + '</td>';
            content += '<td>' + 'open' + '</td>';
            content += '<td>' + data.val().importance + '</td>';
            content += '<td>' + '2018-07-21' + '</td>';
            content += '</tr>';
        });
        document.getElementById('issue-list-content').innerHTML = content;
    });
}());