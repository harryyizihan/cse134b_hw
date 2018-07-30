(function() {
    const config = {
        apiKey: "AIzaSyCNwQawqcisZevqPOA-HKubRkEQl-CGX0Y",
        authDomain: "real-issue-tracker.firebaseapp.com",
        databaseURL: "https://real-issue-tracker.firebaseio.com",
        projectId: "real-issue-tracker",
        storageBucket: "real-issue-tracker.appspot.com",
        messagingSenderId: "817361783935"
    };
    firebase.initializeApp(config);

    const btnSignOut = document.getElementById('sign-out-btn');

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

        } else {
            alert("You are not logged in, how could you get to this page???");
        }
    });

    btnSignOut.addEventListener('click', e => {
        firebase.auth().signOut().then(function() {
            alert('successfully logged out!');
            window.location = 'login_form.html';
        }).catch(function(error) {
            alert(error);
        });
    });
}());