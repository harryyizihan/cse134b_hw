(function() {
    var config = {
        apiKey: "AIzaSyCNwQawqcisZevqPOA-HKubRkEQl-CGX0Y",
        authDomain: "real-issue-tracker.firebaseapp.com",
        databaseURL: "https://real-issue-tracker.firebaseio.com",
        storageBucket: "real-issue-tracker.appspot.com"
    };
    firebase.initializeApp(config);

    var rootNode = document.getElementById('closeselect');

    var userId;
    var issueInfoTable = [];
    //const attachment;

    if (localStorage.getItem("mode") == 1) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                userId = user.uid;
                firebase.database().ref('/users/' + userId).on('value', function(snapshot) {
                    var localcount = 1;
                    snapshot.forEach(element => {
                        console.log(element.val().status);
                        if (element.val().status == "close" || element.val().status == "resolve") {

                        } else {
                            var node = document.createElement("option");
                            node.setAttribute("value", element.val().id);
                            var content = 'Issue #' + element.val().id + ': ' + element.val().name;
                            var textNode = document.createTextNode(content);
                            node.appendChild(textNode);
                            rootNode.appendChild(node);
                            issueInfoTable[localcount] = [];
                            issueInfoTable[localcount].push(element.val().name);
                            issueInfoTable[localcount].push(element.val().type);
                            issueInfoTable[localcount].push(element.val().importance);
                            issueInfoTable[localcount].push(element.val().description);
                            localcount = localcount + 1;
                        }
                    });
                });
            } else {
                //alert("You are not logged in, how could you get to this page???");
                return null;
            }
        });
    }

    //REST
    else {
        const url_db = 'http://localhost:3000/db';

        let xhr = new XMLHttpRequest();
        let numIssues;
        xhr.open('GET', url_db, true);
        xhr.onload = function() {
            data = JSON.parse(this.responseText);
            numIssues = data.issues.length;

            for (i = 0; i < numIssues; i++) {
                var node = document.createElement("option");
                node.setAttribute("value", data.issues[i].id);
                var content = 'Issue #' + data.issues[i].id + ': ' + data.issues[i].name;
                var textNode = document.createTextNode(content);
                node.appendChild(textNode);
                rootNode.appendChild(node);
                issueInfoTable[i] = [];
                issueInfoTable[i].push(data.issues[i].name);
                issueInfoTable[i].push(data.issues[i].type);
                issueInfoTable[i].push(data.issues[i].importance);
                issueInfoTable[i].push(data.issues[i].description);
            }
        }
        xhr.send();
    }

    const deletebutton = document.getElementById("deletebutton");
    deletebutton.addEventListener('click', function() {
        const selector = document.getElementById("closeselect");
        const deletereason = document.getElementsByClassName("checks");
        var reasons = "";
        var index = selector.value;

        if (localStorage.getItem("mode") == 1) {
            var firebaseref = firebase.database().ref("users/" + userId + "/");
            for (var i = 0; i < 4; i++) {
                if (deletereason[i].checked) {
                    reasons += deletereason[i].value + " ";
                }
            };
            firebaseref.child(index).remove();
            var globalref = firebase.database().ref("deletelogs");
            globalref.child(userId).child(index).set(reasons);

            alert("Successfully delete the issue!");
            window.location = 'issuelist.html';
        }

        //REST
        else {
            const url_db = 'http://localhost:3000/issues';
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', url_db + '/' + index, true);
            xhr.onload = function() {
                window.location = 'issuelist.html';
            }
            xhr.send();
            alert("Successfully delete the issue!");
        }
    });

}());