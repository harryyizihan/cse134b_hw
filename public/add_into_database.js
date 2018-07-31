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
    var fileName;

    fileButton.addEventListener('change', function(e) {
        global_mode = localStorage.getItem("mode");

        if (global_mode == 1) {
            var file = e.target.files[0];
            fileName = file.name;
    
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

        //REST
        else {
            alert("Oooops, REST storage endpoint does not support file attachment yet.");
            return;
        } 
    });

    submitBtn.addEventListener('click', e => {
        const name = issueName.value;
        const type = issueType.value;
        const description = issueDescription.value;
        const importance = issueImportance.value;

        var issueId;

        if (!name && ! type) {
            alert('Issue Name and Issue Type are required before submit:)');
            return;
        }

        global_mode = localStorage.getItem("mode");
        if (global_mode == 1) {
            var userRef = firebase.database().ref(userId);
            var countRef = firebase.database().ref('Count');
            var count = countRef.once('value').then(function(snapshot) {
                if (typeof snapshot === "undefined") {
                    issueId = 1;
                    console.log('undefined');
    
                    const issueid = issueId;
    
                    var firebaseRef = firebase.database().ref("users/" + userId + "/" + issueid);
                    firebaseRef.child("id").set(issueid);
                    firebaseRef.child("name").set(name);
                    firebaseRef.child("type").set(type);
                    firebaseRef.child("description").set(description);
                    firebaseRef.child("importance").set(importance);
                    if (typeof fileName === "undefined") {
    
                    } else {
                        firebaseRef.child("filename").set(fileName);
                    }
            
                    var updates = {};
                    updates['Count'] = issueId;
                    firebase.database().ref().update(updates).then(function() {
                        alert("Successfully submit the issue!");
                        window.location = 'issuelist.html';
                    });
                } else {
                    issueId = snapshot.val() + 1;
                    console.log('got it!');
    
                    const issueid = issueId;
    
                    var firebaseRef = firebase.database().ref("users/" + userId + "/" + issueid);
                    firebaseRef.child("id").set(issueid);
                    firebaseRef.child("name").set(name);
                    firebaseRef.child("type").set(type);
                    firebaseRef.child("description").set(description);
                    firebaseRef.child("importance").set(importance);
                    if (typeof fileName === "undefined") {
    
                    } else {
                        firebaseRef.child("filename").set(fileName);
                    }
            
                    var updates = {};
                    updates['Count'] = issueId;
                    firebase.database().ref().update(updates).then(function() {
                        alert("Successfully submit the issue!");
                        window.location = 'issuelist.html';
                    });
                }
            });
        }



        
        //REST
        else {

        }
    });
}());