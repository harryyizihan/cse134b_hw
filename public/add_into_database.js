(function() {
    var config = {
        apiKey: "AIzaSyCNwQawqcisZevqPOA-HKubRkEQl-CGX0Y",
        authDomain: "real-issue-tracker.firebaseapp.com",
        databaseURL: "https://real-issue-tracker.firebaseio.com",
        storageBucket: "real-issue-tracker.appspot.com"
    };
    firebase.initializeApp(config);

    const issueName = document.getElementById('issue-name');
    const issueType = document.getElementById('issue-type');
    const issueDescription = document.getElementById('issue-description');
    const issueImportance = document.getElementById('issue-importance');
    const submitBtn = document.getElementById('submit-btn');
    //const attachment;
    var userId;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userId = user.uid;
        } else {
            //alert("You are not logged in, how could you get to this page???");
        }
    });

    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('fileButton');

    fileButton.addEventListener('change', function(e) {
        // Get file
        var file = e.target.files[0];

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
                alert('Something wrong with the file upload!');
            },

            function complete() {   
                alert('Nice! Firebase got your file:)');
            }
        );
    });

    submitBtn.addEventListener('click', e => {
        const name = issueName.value;
        const type = issueType.value;
        const description = issueDescription.value;
        const importance = issueImportance.value;

        var issueId;

        var userRef = firebase.database().ref(userId);
        var countRef = firebase.database().ref('Count');
        var count = countRef.on('value', snap => {
            if (typeof snap === undefined) {
                issueId = 1;
            } else {
                issueId = snap.val() + 1;
            }
        });

        var firebaseRef = firebase.database().ref("users/" + userId + "/" + issueId);
        firebaseRef.child("id").set(issueId);
        firebaseRef.child("name").set(name);
        firebaseRef.child("type").set(type);
        firebaseRef.child("description").set(description);
        firebaseRef.child("importance").set(importance);

        var updates = {};
        updates['Count'] = issueId;
        firebase.database().ref().update(updates).then(function() {
            alert("Successfully submit the issue!");
            window.location = 'issuelist.html';
        });
    });
}());