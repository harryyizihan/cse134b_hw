(function() {
    global_mode = localStorage.getItem("mode");
    if (global_mode == 1) {
        var config = {
            apiKey: "AIzaSyCNwQawqcisZevqPOA-HKubRkEQl-CGX0Y",
            authDomain: "real-issue-tracker.firebaseapp.com",
            databaseURL: "https://real-issue-tracker.firebaseio.com",
            storageBucket: "real-issue-tracker.appspot.com"
        };
        firebase.initializeApp(config);

        issueId = "3";

        //const attachment;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                userId = user.uid;
                firebase.database().ref('/users/' + userId + '/' + issueId).once('value').then(function(data){
                    read_name = "<h2>Issue Name: " + data.val().name + "</h2>";
                    document.getElementById("issue-name").innerHTML = read_name;

                    read_type = "<h2>Issue Type: " + data.val().type + "</h2>";
                    document.getElementById("issue-type").innerHTML = read_type;

                    read_time = "<h2>Issue occurred date: <time>2018-07-22</time></h2>";
                    document.getElementById("issue-date").innerHTML = read_time;

                    read_description = "<h2>Issue Description: </h2> <p>" + data.val().description + "/<p>";
                    document.getElementById("issue-description").innerHTML = read_description;

                    storageRef = firebase.storage().ref(userId + '/' + data.val().filename);
                    storageRef.getDownloadURL().then(function(url) {
                        attach_img = document.createElement('img');
                        attach_img.setAttribute('src', url);
                        document.getElementById("issue-picture").appendChild(attach_img);
                    })
                });
            } else {
                //alert("You are not logged in, how could you get to this page???");
                return null;
            }
        });
    } 
    
    //REST
    else {
        alert("Whoops, function not support yet.")
    }
}());