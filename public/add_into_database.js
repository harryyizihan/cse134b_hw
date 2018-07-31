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