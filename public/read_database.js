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

        //const attachment;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                userId = user.uid;
                firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
                    content = "";
                    snapshot.forEach(function(data) {
                        content += '<tr>';
                        content += '<td>' + data.val().id + '</td>';
                        content += '<td> <a href="./sample_detail_page.html" onclick="recordID(' + data.val().id + ')">' + data.val().name + '</a></td>';
                        content += '<td>' + data.val().type + '</td>';
                        content += '<td>' + data.val().status + '</td>';
                        content += '<td>' + data.val().importance + '</td>';
                        content += '<td>' + data.val().datetime + '</td>';
                        content += '</tr>';
                    });
                    document.getElementById('issue-list-content').innerHTML = content;
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
            let content = "";

            for (i = 0; i < data.issues.length; i++) {
                content += '<tr>';
                content += '<td>' + data.issues[i].id + '</td>';
                content += '<td> <a href="./sample_detail_page.html" onclick="recordID(' + data.issues[i].id + ')">' + data.issues[i].name + '</a></td>';
                content += '<td>' + data.issues[i].type + '</td>';
                content += '<td>' + data.issues[i].status + '</td>';
                content += '<td>' + data.issues[i].importance + '</td>';
                content += '<td>' + data.issues[i].datetime + '</td>';
                content += '</tr>';

            }

            document.getElementById('issue-list-content').innerHTML = content;
        }
    }
}());