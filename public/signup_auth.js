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
    const btnSignup = document.getElementById('signup');

    btnSignup.addEventListener('click', e => {
        const emailVal = email.value;
        const pass = password.value;
        const auth = firebase.auth();

        console.log('got there');

        const promise = auth.createUserWithEmailAndPassword(emailVal, pass);
        promise.catch(e => console.log(e.message));
    });


    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log('not logged in');
        }
    });
}());