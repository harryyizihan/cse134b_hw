(function() {
    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyCNwQawqcisZevqPOA-HKubRkEQl-CGX0Y",
        authDomain: "real-issue-tracker.firebaseapp.com",
        databaseURL: "https://real-issue-tracker.firebaseio.com",
        projectId: "real-issue-tracker",
        storageBucket: "real-issue-tracker.appspot.com",
        messagingSenderId: "817361783935"
    };
    firebase.initializeApp(config);

    const email = document.getElementById('email-txt');
    const password = document.getElementById('password-txt');
    const passwordRepeat = document.getElementById('password-repeat');
    const btnSignup = document.getElementById('signup');

    btnSignup.addEventListener('click', e => {
        const emailVal = email.value;
        const pass = password.value;
        const passRepeat = passwordRepeat.value;

        if (!email || !pass || !passRepeat) {
            alert('Please complete the form first!');
        } else if (pass != passRepeat) {
            alert('The two passwords you entered cannot match!');
        } else {
            firebase.auth().createUserWithEmailAndPassword(emailVal, pass).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
        }
    });


    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            alert('You are now logged in!');
            window.location = 'issuelist.html';
        } else {
            alert('Not logged in!');
        }
    });
}());