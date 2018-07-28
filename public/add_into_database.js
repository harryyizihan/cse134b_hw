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
          alert(user.uid);
          userId = user.uid;
        } else {
          alert("No user logged in!");
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
        var count = countRef.on('value', snap => 
            issueId = snap.val() + 1);
        
        firebase.database().ref().set("0");

        var firebaseRef = firebase.database().ref(userId + "/" + issueId);
        firebaseRef.child("Issue ID").set(issueId);
        firebaseRef.child("Issue Name").set(name);
        firebaseRef.child("Issue Type").set(type);
        firebaseRef.child("Issue Description").set(description);
        firebaseRef.child("Issue Importance").set(importance);
    });
}());