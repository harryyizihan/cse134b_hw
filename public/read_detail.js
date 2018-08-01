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

        // obtain issueID to render from localStorage
        var issueId = localStorage.getItem("click_id");

        //const attachment;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                userId = user.uid;
                firebase.database().ref('/users/' + userId + '/' + issueId).once('value').then(function(data){
                    read_name = "<h2>Issue Name: " + data.val().name + "</h2>";
                    document.getElementById("issue-name").innerHTML = read_name;

                    read_type = "<h2>Issue Type: " + data.val().type + "</h2>";
                    document.getElementById("issue-type").innerHTML = read_type;

                    read_time = "<h2>Issue occurred date: <time>" + data.val().datetime + "</time></h2>";
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
        const url = 'http://localhost:3000/db';

        window.addEventListener('DOMContentLoaded', function() {
            getIssues();
        });

        function getIssues() {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function() {
                renderIssues(this.responseText);
            }
            xhr.send();
        }

        // renderIssues - render the passed issues using template literals as opposed to template tags to show possibilities
        // approach deeply buries in the markup though!
        function renderIssues(issues) {
            data = JSON.parse(issues);

            read_name = "<h2>Issue Name: " + data.issues[issueId].name + "</h2>";
            document.getElementById("issue-name").innerHTML = read_name;

            read_type = "<h2>Issue Type: " + data.issues[issueId].type + "</h2>";
            document.getElementById("issue-type").innerHTML = read_type;

            read_time = "<h2>Issue occurred date: <time>" + data.issues[issueId].datetime + "</time></h2>";
            document.getElementById("issue-date").innerHTML = read_time;

            read_description = "<h2>Issue Description: </h2> <p>" + data.issues[issueId].description + "/<p>";
            document.getElementById("issue-description").innerHTML = read_description;
        }
    }
}());