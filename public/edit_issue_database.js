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
    //const attachment;

    if (localStorage.getItem("mode") == 1) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                userId = user.uid;
                firebase.database().ref('/users/' + userId).on('value', function(snapshot) {
                    snapshot.forEach(element => {
                        var node = document.createElement("option");
                        node.setAttribute("value", element.val().id);
                        var content = 'Issue #' + element.val().id + ': ' + element.val().name;
                        var textNode = document.createTextNode(content);
                        node.appendChild(textNode);
                        rootNode.appendChild(node);
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
                    var content = 'Issue #' +  data.issues[i].id + ': ' + data.issues[i].name;
                    var textNode = document.createTextNode(content);
                    node.appendChild(textNode);
                    rootNode.appendChild(node);
                }
            }
            xhr.send();
    }

    rootNode.addEventListener('change', function() {
        //console.log(rootNode.options[rootNode.selectedIndex].value);
        var index = rootNode.options[rootNode.selectedIndex].value;

        if (localStorage.getItem("mode") == 1) {
            firebase.database().ref('/users/' + userId + '/' + index).on('value', function(snapshot) {
                document.getElementById('fk-name').value = snapshot.child("name").val();
                document.getElementById('select-issue').value = snapshot.child("type").val();
                document.getElementById('description').innerHTML = snapshot.child("description").val();
                document.getElementById('importance').value = snapshot.child("importance").val();
                if (snapshot.hasChild("filename")) {
                    document.getElementById('prev-file').innerHTML = snapshot.child("filename").val();
                }
            });
        }

        //REST
        else {
            const url_db = 'http://localhost:3000/db';

            let xhr = new XMLHttpRequest();
            xhr.open('GET', url_db, true);
            xhr.onload = function() {
                data = JSON.parse(this.responseText);
                document.getElementById('fk-name').value = data.issues[index - 1].name;
                document.getElementById('select-issue').value = data.issues[index - 1].type;
                document.getElementById('description').innerHTML = data.issues[index - 1].description;
                document.getElementById('importance').value = data.issues[index - 1].importance;
            }
            xhr.send();
        }
    });

    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('fileButton');
    var fileName;

    fileButton.addEventListener('change', function(e) {
        // Get file
        var file = e.target.files[0];
        fileName = file.name;

        if (localStorage.getItem("mode") == 1) {
            // Create a storage ref
            var storageRef = firebase.storage().ref(userId + '/' + file.name);

            // upload file
            var task = storageRef.put(file);

            // update progress bar
            task.on('state_changed',

                function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = percentage;
                },

                function error(err) {
                    alert('Something wrong with uploading the file!');
                },

                function complete() {
                    alert('Nice! Firebase got your file:)');
                }
            );
        }

        // REST
        else {
            alert("REST storage endpoint does not support attachments yet!");
        }
    });

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', function() {
        const nameChange = document.getElementById('fk-name');
        const typeChange = document.getElementById('select-issue');
        const descriptiponChange = document.getElementById('description');
        const importanceChange = document.getElementById('importance');

        var updates = {};
        var index = rootNode.options[rootNode.selectedIndex].value;

        if (localStorage.getItem("mode") == 1) {
            updates['name'] = nameChange.value;
            updates['type'] = typeChange.value;
            updates['description'] = descriptiponChange.value;
            updates['importance'] = importanceChange.value;
            updates['datetime'] = new Date().toLocaleString();
            if (typeof fileName === "undefined") {

            } else {
                updates['filename'] = fileName;
            }

            firebase.database().ref('/users/' + userId + '/' + index).update(updates).then(function() {
                alert("Successfully edit the issue!");
                window.location = 'issuelist.html';
            });
        }

        //REST
        else {
            updates.name = nameChange.value;
            updates.type = typeChange.value;
            updates.description = descriptiponChange.value;
            updates.importance = importanceChange.value;
            updates.id = index;
            updates.datetime = new Date().toLocaleString();
            updates = JSON.stringify(updates);

            const url = 'http://localhost:3000/issues/' + index;

            var xhr = new XMLHttpRequest();
            xhr.open("PUT", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                alert("Successful edit the issue!");
                window.location = 'issuelist.html';
            }
            xhr.send(updates);
        }
    });
}());