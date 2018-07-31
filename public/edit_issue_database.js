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

    rootNode.addEventListener('change', function() {
       //console.log(rootNode.options[rootNode.selectedIndex].value);
       var index = rootNode.options[rootNode.selectedIndex].value;
       firebase.database().ref('/users/' + userId + '/' + index).on('value', function(snapshot) {
            document.getElementById('fk-name').value = snapshot.child("name").val();
            document.getElementById('select-issue').value = snapshot.child("type").val();
            document.getElementById('description').innerHTML = snapshot.child("description").val();
            document.getElementById('importance').value = snapshot.child("importance").val();
       }); 
    });

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', function() {
        const nameChange = document.getElementById('fk-name');
        const typeChange = document.getElementById('select-issue');
        const descriptiponChange = document.getElementById('description');
        const importanceChange = document.getElementById('importance');

        var updates = {};
        var index = rootNode.options[rootNode.selectedIndex].value;

        updates['name'] = nameChange.value;
        updates['type'] = typeChange.value;
        updates['description'] = descriptiponChange.value;
        updates['importance'] = importanceChange.value;

        firebase.database().ref('/users/' + userId + '/' + index).update(updates).then(function() {
            alert("Successfully update the issue!");
            window.location = 'issuelist.html';
        });
    });
}());